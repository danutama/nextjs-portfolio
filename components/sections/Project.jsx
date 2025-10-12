'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import projects from '@/data/project.json';
import TransitionLink from '@/components/globals/TransitionLink';
import '@/components/css/project.css';

export default function Project() {
  const sectionRef = useRef(null);
  const scenesRef = useRef([]);
  const animateIdRef = useRef(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const items = document.querySelectorAll('.project-item');
    const isMobile = window.innerWidth < 640;
    const SEGMENTS = isMobile ? 16 : 64;
    const MAX_DPR = 2;

    items.forEach((item, i) => {
      const imageElement = item.querySelector('.project-image');
      const img = imageElement.querySelector('img');
      img.style.opacity = '0';

      // === Canvas per image ===
      const canvas = document.createElement('canvas');
      Object.assign(canvas.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '1',
      });
      imageElement.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = imageElement.clientWidth * dpr;
      const ch = imageElement.clientHeight * dpr;
      renderer.setPixelRatio(dpr);
      renderer.setSize(cw, ch, false);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const rect = imageElement.getBoundingClientRect();
      const aspect = rect.width / rect.height;
      const fov = 45;
      const height = 1.7;
      const distance = height / (2 * Math.tan((fov * Math.PI) / 360));
      const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
      camera.position.z = distance;
      camera.updateProjectionMatrix();

      const scene = new THREE.Scene();

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        img.src,
        (texture) => {
          texture.minFilter = THREE.LinearMipMapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = true;
          texture.colorSpace = THREE.SRGBColorSpace;

          const width = height * aspect;
          const geometry = new THREE.PlaneGeometry(width, height, SEGMENTS, SEGMENTS);
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          const hover = { x: 0, y: 0, active: false };

          // === EVENT HANDLER ===
          const triggerRipple = (x, y) => {
            hover.active = true;
            hover.x = x;
            hover.y = y;
            hover.startTime = performance.now() / 1000;
            if (!animateIdRef.current) animate(); // restart loop when idle
          };

          canvas.addEventListener('mouseenter', (e) => {
            const rect = canvas.getBoundingClientRect();
            triggerRipple(((e.clientX - rect.left) / rect.width - 0.5) * 2, -((e.clientY - rect.top) / rect.height - 0.5) * 2);
          });

          canvas.addEventListener('mousemove', (e) => {
            if (!hover.active) return;
            const rect = canvas.getBoundingClientRect();
            triggerRipple(((e.clientX - rect.left) / rect.width - 0.5) * 2, -((e.clientY - rect.top) / rect.height - 0.5) * 2);
          });

          canvas.addEventListener('mouseleave', () => {
            hover.active = false;
          });

          // mobile: tap = trigger ripple
          canvas.addEventListener('touchstart', (e) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            triggerRipple(((touch.clientX - rect.left) / rect.width - 0.5) * 2, -((touch.clientY - rect.top) / rect.height - 0.5) * 2);
          });

          scenesRef.current[i] = {
            scene,
            camera,
            renderer,
            geometry,
            material,
            mesh,
            hover,
            positionAttribute: geometry.getAttribute('position'),
            originalPositions: geometry.getAttribute('position').array.slice(),
            time: 0,
            loaded: true,
          };

          renderer.render(scene, camera);
        },
        undefined,
        () => {
          img.style.opacity = '1';
        }
      );
    });

    // === Resize handler ===
    const handleResize = () => {
      items.forEach((item, i) => {
        const s = scenesRef.current[i];
        if (!s) return;
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const imageElement = item.querySelector('.project-image');
        const cw = imageElement.clientWidth * dpr;
        const ch = imageElement.clientHeight * dpr;
        s.renderer.setSize(cw, ch, false);

        const rect = imageElement.getBoundingClientRect();
        s.camera.aspect = rect.width / rect.height;
        s.camera.updateProjectionMatrix();
      });
    };
    window.addEventListener('resize', handleResize);

    // === Animation with auto-pause ===
    const clock = new THREE.Clock();
    let idleTime = 0;

    const animate = () => {
      if (!isActiveRef.current) return;
      animateIdRef.current = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.016);
      let anyActive = false;

      scenesRef.current.forEach((s) => {
        if (!s || !s.loaded) return;

        s.time += delta * 2;
        const positions = s.positionAttribute.array;
        const hover = s.hover;
        if (hover.active) anyActive = true;

        for (let i = 0; i < positions.length; i += 3) {
          const x = s.originalPositions[i];
          const y = s.originalPositions[i + 1];
          const z = s.originalPositions[i + 2];

          let waveZ = 0;
          if (hover.active && hover.startTime) {
            const timeSince = performance.now() / 1000 - hover.startTime;
            const dx = x - hover.x;
            const dy = y - hover.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const wave = Math.sin(dist * 12 - timeSince * 6);
            const attenuation = Math.exp(-dist * 3) * Math.exp(-timeSince * 1.5);
            waveZ = wave * attenuation * 0.45;
          }

          positions[i + 2] += (z + waveZ - positions[i + 2]) * 0.15;
        }

        s.positionAttribute.needsUpdate = true;
        s.renderer.render(s.scene, s.camera);
      });

      // === Auto pause logic ===
      if (!anyActive) {
        idleTime += delta;
        if (idleTime > 3) {
          cancelAnimationFrame(animateIdRef.current);
          animateIdRef.current = null;
          return;
        }
      } else {
        idleTime = 0;
      }
    };

    animate();

    // === Pause if tab not visible ===
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false;
        cancelAnimationFrame(animateIdRef.current);
        animateIdRef.current = null;
      } else {
        isActiveRef.current = true;
        clock.start();
        if (!animateIdRef.current) animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(animateIdRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      scenesRef.current.forEach((s) => {
        if (!s) return;
        s.geometry.dispose();
        s.material.map.dispose();
        s.material.dispose();
        s.renderer.dispose();
      });
    };
  }, []);

  return (
    <section id="project" ref={sectionRef}>
      <div className="container">
        <div className="project-header">
          <span className="project-number">{projects.length}</span>
          <h2>
            <span className="font-secondary">Selected</span>
            <br />
            work
          </h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.slug} className="project-item">
              <TransitionLink href={`/projects/${project.slug}`} className="project-link">
                <div className="project-image">
                  <img src={project.images?.[0]} alt={project.title} />
                </div>
              </TransitionLink>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <h4 className="project-role">{project.role}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
