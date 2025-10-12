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
    let scrollStrength = 0;
    let targetStrength = 0;
    let lastScrollY = window.scrollY;

    const isMobile = window.innerWidth < 640;
    const SEGMENTS = isMobile ? 8 : 64; // mesh for mobile
    const MAX_DPR = 2;
    // const MAX_DPR = isMobile ? 1 : 2; // when mobile

    items.forEach((item, i) => {
      const imageElement = item.querySelector('.project-image');
      const img = imageElement.querySelector('img');
      img.style.opacity = '0';

      // Canvas per project
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '1';
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
      camera.aspect = aspect;
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

          scenesRef.current[i] = {
            scene,
            camera,
            renderer,
            geometry,
            material,
            mesh,
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

    // Scroll handler
    const handleScroll = () => {
      const diff = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      targetStrength = Math.min(diff / 120, 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      items.forEach((item, i) => {
        const imageElement = item.querySelector('.project-image');
        const s = scenesRef.current[i];
        if (!s) return;
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const cw = imageElement.clientWidth * dpr;
        const ch = imageElement.clientHeight * dpr;
        s.renderer.setSize(cw, ch, false);

        const rect = imageElement.getBoundingClientRect();
        s.camera.aspect = rect.width / rect.height;
        s.camera.updateProjectionMatrix();
      });
    };
    window.addEventListener('resize', handleResize);

    // Animate loop with wave
    const clock = new THREE.Clock();
    const animate = () => {
      if (!isActiveRef.current) return;
      animateIdRef.current = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.016);

      scrollStrength += (targetStrength - scrollStrength) * 0.08;
      targetStrength *= 0.95;

      scenesRef.current.forEach((s) => {
        if (!s || !s.loaded) return;
        const positions = s.positionAttribute.array;

        if (scrollStrength > 0.001) {
          s.time += delta * 2;
          for (let i = 0; i < positions.length; i += 3) {
            const x = s.originalPositions[i];
            const y = s.originalPositions[i + 1];
            const z = s.originalPositions[i + 2];
            const waveZ = Math.sin(x * 6 + s.time) * Math.cos(y * 6 + s.time) * 0.3 * scrollStrength;
            positions[i + 2] = z + waveZ;
          }
        } else {
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += (s.originalPositions[i + 2] - positions[i + 2]) * 0.08;
          }
        }

        s.positionAttribute.needsUpdate = true;
        s.renderer.render(s.scene, s.camera);
      });
    };
    animate();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false;
        cancelAnimationFrame(animateIdRef.current);
      } else {
        isActiveRef.current = true;
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animateIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
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
