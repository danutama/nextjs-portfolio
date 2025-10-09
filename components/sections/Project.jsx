'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import projects from '@/data/project.json';
import TransitionLink from '../globals/TransitionLink';
import '../css/project.css';

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function Project() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const proxyRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    const proxy = proxyRef.current;
    const images = imagesRef.current;
    const totalWidth = scroll.scrollWidth - window.innerWidth;

    const triggers = [];
    const drags = [];

    // Horizontal scroll
    const horizontalAnim = gsap.to(scroll, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        id: 'horizontal-scroll',
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: () => updateParallax(),
      },
    });

    triggers.push(horizontalAnim.scrollTrigger);

    // --- parallax custom X scroll container ---
    function updateParallax() {
      const currentX = gsap.getProperty(scroll, 'x');
      const progress = -currentX / totalWidth;

      images.forEach((img) => {
        const inner = img.querySelector('.project-image-inner');
        const offset = gsap.utils.interpolate(-10, 10, progress);
        gsap.to(inner, { xPercent: offset, duration: 0.3, ease: 'power1.out' });
      });
    }

    // --- Drag momentum ---
    let velocity = 0;
    let lastX = 0;
    let anim = null;

    const drag = Draggable.create(proxy, {
      type: 'x',
      trigger: section,
      onPress() {
        gsap.killTweensOf(scroll);
        if (anim) anim.kill();
        lastX = this.x;
      },
      onDrag() {
        const dx = this.x - lastX;
        lastX = this.x;
        velocity = dx;
        const scrollX = gsap.utils.clamp(-totalWidth, 0, gsap.getProperty(scroll, 'x') + dx * 2);
        gsap.set(scroll, { x: scrollX });
        updateParallax();
        ScrollTrigger.update();
      },
      onRelease() {
        animateInertia();
      },
    })[0];

    drags.push(drag);

    function animateInertia() {
      if (Math.abs(velocity) < 1) return;

      anim = gsap.to(scroll, {
        x: '+=' + velocity * 20,
        duration: 1,
        ease: 'power2.out',
        onUpdate: () => {
          const x = gsap.getProperty(scroll, 'x');
          if (x > 0 || x < -totalWidth) anim.kill();
          updateParallax();
          ScrollTrigger.update();
        },
        onComplete: () => (velocity = 0),
      });
    }

    // Cleanup
    return () => {
      triggers.forEach((t) => t?.kill());
      drags.forEach((d) => d?.kill());
    };
  }, []);

  return (
    <section id="project" ref={sectionRef}>
      <span className="slide-text">Slide</span>
      <h2>
        <span className="font-secondary">Selected</span>
        <br />
        Projects
      </h2>
      <div ref={proxyRef} style={{ display: 'none' }} />
      <div className="project-scroll" ref={scrollRef}>
        {projects.map((p, i) => (
          <div key={p.slug} className="project-item" ref={(el) => (imagesRef.current[i] = el)}>
            <TransitionLink href={`/projects/${p.slug}`} className="project-link">
              <div className="project-image">
                <div className="project-image-inner">
                  <img src={p.images?.[0]} alt={p.title} />
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
            </TransitionLink>
          </div>
        ))}
      </div>
    </section>
  );
}
