'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/globals/TransitionLink';
import projects from '../../data/project.json';
import '../css/project_list.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectList() {
  const projectCount = projects.length;
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = containerRef.current.querySelectorAll('.card-number');

      numbers.forEach((wrapper) => {
        const tens = wrapper.querySelector('.digit.tens');
        const ones = wrapper.querySelector('.digit.ones');

        gsap.set([tens, ones], { y: '100%' });

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to([tens, ones], {
              y: '0%',
              duration: 1,
              ease: 'power3.inOut',
              stagger: 0.2,
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="project-list" ref={containerRef}>
      <div className="container">
        <h2 className="project-list-heading">
          Selected Works
          <span className="number">({String(projectCount).padStart(2, '0')})</span>
        </h2>

        <ul className="project-list-items">
          {projects.slice(0, 4).map((project, i) => {
            const num = String(i + 1).padStart(2, '0');
            const tens = num[0];
            const ones = num[1];
            return (
              <li key={project.slug} className="project-list-card">
                <TransitionLink href={`/projects/${project.slug}`} className="project-list-card-link">
                  <div className="project-list-card-image-wrapper">
                    <span className="card-overview fw-normal">{project.overview}</span>
                    <span className="card-number-wrapper">
                      <span className="card-number">
                        <span className="digit tens">{tens}</span>
                        <span className="digit ones" data-final={ones}>
                          {ones}
                        </span>
                      </span>
                    </span>
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </div>

                  <div className="project-list-card-text-wrapper">
                    <h3 className="project-list-card-title fw-normal font-secondary">{project.title}</h3>
                  </div>
                </TransitionLink>
              </li>
            );
          })}
        </ul>

        <div className="project-list-nav-wrapper">
          <TransitionLink href="/projects" className="project-list-nav btn-icon">
            view all <span className="material-symbols-outlined">arrow_outward</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
