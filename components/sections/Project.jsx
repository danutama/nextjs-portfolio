'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from '@/data/project.json';
import TransitionLink from '../globals/TransitionLink';
import '../css/project.css';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.project-item');

      items.forEach((item, i) => {
        const anim = gsap.fromTo(item, { y: 100, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', paused: true });

        let targetProgress = 0;
        let currentProgress = 0;

        const st = ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          end: 'bottom 70%',
          scrub: true,
          markers: false,
          id: `project-${i}`,
          fastScrollEnd: true,
          onUpdate: (self) => {
            targetProgress = self.progress;
          },
        });

        gsap.ticker.add(() => {
          currentProgress = gsap.utils.interpolate(currentProgress, targetProgress, 0.1);
          anim.progress(currentProgress);
        });
      });
    }, sectionRef);

    return () => ctx.revert();
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
