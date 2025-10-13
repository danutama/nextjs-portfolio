'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import TransitionLink from '@/components/globals/TransitionLink';
import projects from '../../data/project.json';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/project_list.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectList() {
  const wrappersRef = useRef([]);

  useEffect(() => {
    const triggers = [];

    wrappersRef.current.forEach((wrapper) => {
      if (!wrapper) return;

      const inner = wrapper.querySelector('.parallax-inner');
      if (!inner) return;

      gsap.set(inner, { yPercent: -10 });

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(inner, {
            yPercent: gsap.utils.interpolate(-10, 10, self.progress),
            overwrite: 'auto',
          });
        },
      });

      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const projectCount = projects.length;

  return (
    <section id="project-list">
      <div className="container">
        <h2 className="project-list-heading">
          Selected Works<span className="number">({String(projectCount).padStart(2, '0')})</span>
        </h2>

        <ul className="project-list-items">
          {projects.slice(0, 4).map((project, i) => {
            const number = String(i + 1).padStart(2, '0');
            return (
              <li key={project.slug} className="project-list-card">
                <TransitionLink href={`/projects/${project.slug}`} className="project-list-card-link">
                  <div ref={(el) => (wrappersRef.current[i] = el)} className="project-list-card-image-wrapper">
                    <div className="parallax-inner">
                      <Image src={project.images?.[0]} alt={project.title} fill className="project-list-card-image" />
                    </div>
                  </div>

                  <div className="project-list-card-text-wrapper">
                    <span className="project-list-card-number">{number},</span>
                    <div>
                      <h3 className="project-list-card-title fw-normal font-secondary">{project.title}</h3>
                      <p className="project-list-card-desc fw-normal">{project.role}</p>
                    </div>
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
