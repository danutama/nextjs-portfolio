'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import projects from '@/data/project.json';
import TransitionLink from '../globals/TransitionLink';
import '../css/project.css';

export default function Project() {
  const sectionRef = useRef(null);
  const containerRef = useRef({});

  useEffect(() => {
    const items = document.querySelectorAll('.project-item');

    items.forEach((item, i) => {
      const imageElement = item.querySelector('.project-image');

      // --- Setup canvas & Three.js scene ---
      const canvas = document.createElement('canvas');
      Object.assign(canvas.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      });
      imageElement.style.position = 'relative';
      imageElement.prepend(canvas);

      const scene = new THREE.Scene();
      const rect = imageElement.getBoundingClientRect();
      const camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 1000);
      camera.position.z = 2;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(rect.width, rect.height);
      renderer.setClearColor(0x000000, 0);

      // --- Texture & Mesh setup ---
      const img = imageElement.querySelector('img');
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(img.src, () => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.colorSpace = THREE.SRGBColorSpace;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      });

      const geometry = new THREE.PlaneGeometry(1.7, 1.7, 64, 64);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const positionAttribute = geometry.getAttribute('position');
      const originalPositions = positionAttribute.array.slice();

      // --- Wave variables ---
      let scrollStrength = 0;
      let targetStrength = 0;
      let lastScrollY = window.scrollY;

      // --- Handle scroll event ---
      const handleScroll = () => {
        const diff = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        targetStrength = Math.min(diff / 120, 1);
      };

      window.addEventListener('scroll', handleScroll);

      // --- Responsive resize ---
      const handleResize = () => {
        const rect = imageElement.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(imageElement);

      // --- Animation loop ---
      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);

        // delay after scroll
        scrollStrength += (targetStrength - scrollStrength) * 0.08;

        targetStrength *= 0.95;

        if (scrollStrength < 0.001) {
          renderer.render(scene, camera);
          return;
        }

        time += 0.1;
        const positions = positionAttribute.array;

        for (let i = 0; i < positions.length; i += 3) {
          const x = originalPositions[i];
          const y = originalPositions[i + 1];
          const z = originalPositions[i + 2];
          const waveZ = Math.sin(x * 6 + time) * Math.cos(y * 6 + time) * 0.6 * scrollStrength;
          positions[i + 2] = z + waveZ;
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
      };

      animate();

      // --- Cleanup ---
      containerRef.current[i] = {
        cleanup: () => {
          window.removeEventListener('scroll', handleScroll);
          resizeObserver.disconnect();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        },
      };
    });

    return () => {
      Object.values(containerRef.current).forEach((item) => {
        if (item.cleanup) item.cleanup();
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
