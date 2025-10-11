'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import projects from '@/data/project.json';
import TransitionLink from '../globals/TransitionLink';
import '../css/project.css';

export default function Project() {
  const sectionRef = useRef(null);
  const rendererRef = useRef(null);
  const scenesRef = useRef([]);
  const animateIdRef = useRef(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    let rafId;

    const waitForLayout = () => {
      return new Promise((resolve) => {
        const check = () => {
          const items = document.querySelectorAll('.project-item');
          if (items.length > 0 && items[0].getBoundingClientRect().width > 0) {
            resolve();
          } else {
            rafId = requestAnimationFrame(check);
          }
        };
        check();
      });
    };

    async function init() {
      await waitForLayout();

      // === Three.js setup ===
      const canvas = document.createElement('canvas');
      Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        zIndex: '10',
        opacity: '0',
      });
      document.body.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;

      const items = document.querySelectorAll('.project-item');
      let scrollStrength = 0;
      let targetStrength = 0;
      let lastScrollY = window.scrollY;

      items.forEach((item, i) => {
        const imageElement = item.querySelector('.project-image');
        const img = imageElement.querySelector('img');
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '0';

        const scene = new THREE.Scene();
        const rect = imageElement.getBoundingClientRect();
        const camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 1000);
        camera.position.z = 2;

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(img.src, (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.colorSpace = THREE.SRGBColorSpace;

          const geometry = new THREE.PlaneGeometry(1.7, 1.7, 64, 64);
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          scenesRef.current[i] = {
            scene,
            camera,
            imageElement,
            img,
            geometry,
            material,
            mesh,
            positionAttribute: geometry.getAttribute('position'),
            originalPositions: geometry.getAttribute('position').array.slice(),
            time: 0,
          };

          renderer.render(scene, camera);
          img.style.opacity = '1';
        });

        scenesRef.current[i] = { imageElement, img, scene, camera };
      });

      // === Scroll handler ===
      const handleScroll = () => {
        const diff = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        targetStrength = Math.min(diff / 120, 1);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // === Resize handler ===
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        scenesRef.current.forEach((sceneObj) => {
          if (sceneObj.camera) {
            const rect = sceneObj.imageElement.getBoundingClientRect();
            sceneObj.camera.aspect = rect.width / rect.height;
            sceneObj.camera.updateProjectionMatrix();
          }
        });
      };

      const images = Array.from(document.querySelectorAll('.project-image img'));
      Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((res) => (img.onload = res));
        })
      ).then(() => {
        handleResize();
        canvas.style.transition = 'opacity 0.4s ease';
        canvas.style.opacity = '1';
      });

      window.addEventListener('resize', handleResize);

      // === Clock & Render Throttle ===
      const clock = new THREE.Clock();
      let frameCount = 0;

      const animate = () => {
        if (!isActiveRef.current) return;
        animateIdRef.current = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        scrollStrength += (targetStrength - scrollStrength) * 0.08;
        targetStrength *= 0.95;
        frameCount++;

        // Render 10 frame (~6fps idle)
        if (scrollStrength > 0.001 || frameCount % 10 === 0) {
          scenesRef.current.forEach((sceneObj) => {
            if (!sceneObj.positionAttribute) return;

            // Update wave when moving
            if (scrollStrength > 0.001) {
              sceneObj.time += delta * 2;
              const positions = sceneObj.positionAttribute.array;

              for (let i = 0; i < positions.length; i += 3) {
                const x = sceneObj.originalPositions[i];
                const y = sceneObj.originalPositions[i + 1];
                const z = sceneObj.originalPositions[i + 2];
                const waveZ = Math.sin(x * 6 + sceneObj.time) * Math.cos(y * 6 + sceneObj.time) * 0.6 * scrollStrength;
                positions[i + 2] = z + waveZ;
              }

              sceneObj.positionAttribute.needsUpdate = true;
            }

            const rect = sceneObj.imageElement.getBoundingClientRect();
            renderer.setScissorTest(true);
            renderer.setScissor(rect.left, window.innerHeight - rect.bottom, rect.width, rect.height);
            renderer.setViewport(rect.left, window.innerHeight - rect.bottom, rect.width, rect.height);
            renderer.render(sceneObj.scene, sceneObj.camera);
            renderer.setScissorTest(false);
          });
        }
      };

      animate();

      // === Pause animation ===
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

      // === Cleanup ===
      return () => {
        isActiveRef.current = false;
        cancelAnimationFrame(animateIdRef.current);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        scenesRef.current.forEach((sceneObj) => {
          if (sceneObj.geometry) sceneObj.geometry.dispose();
          if (sceneObj.material) sceneObj.material.dispose();
          if (sceneObj.img) sceneObj.img.style.opacity = '1';
        });
        renderer.dispose();
        canvas.remove();
        rendererRef.current = null;
        scenesRef.current = [];
      };
    }

    init();
    return () => cancelAnimationFrame(rafId);
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
