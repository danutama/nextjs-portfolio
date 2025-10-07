'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/globals/TransitionLink';
import projects from '../../data/project.json';
import '../css/project_detail.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail({ project }) {
  const wrappersRef = useRef([]);
  const triggersRef = useRef([]);
  const [brokenImages, setBrokenImages] = useState({});

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
          });
        },
      });

      triggers.push(trigger);
    });

    triggersRef.current = triggers;
    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleImageError = (index) => {
    setBrokenImages((prev) => ({ ...prev, [index]: true }));
  };

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <section id="project-detail">
      <div className="container">
        <h1 className="project-detail-title">{project.title}</h1>

        <p className="project-detail-year small fw-normal">
          {project.year} &mdash; {project.type}
        </p>

        <div className="project-detail-data">
          <div className="project-detail-items">
            <p className="fw-normal">Role</p>
            <p className="fw-normal">{project.role}</p>
          </div>

          <div className="project-detail-items">
            <p className="fw-normal">Tech stack</p>
            <p className="fw-normal">{project.technology.join(', ')}</p>
          </div>

          <div className="project-detail-items">
            <p className="fw-normal">Design</p>
            <p className="fw-normal">{project.designBy}</p>
          </div>

          <div className="project-detail-items">
            <p className="fw-normal">Development</p>
            <p className="fw-normal">{project.developmentBy}</p>
          </div>

          <div className="project-detail-items">
            <p className="fw-normal">Responsibilities</p>
            <p className="fw-normal">{project.task.join(', ')}</p>
          </div>

          {project.url && (
            <div className="project-detail-items">
              <p className="fw-normal">URL</p>
              <p className="fw-normal">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Live preview
                </a>
              </p>
            </div>
          )}
        </div>

        <p className="project-detail-desc fw-normal">{project.description}</p>

        <div className="project-detail-images">
          {project.detailImages?.length ? (
            project.detailImages.map((src, i) => (
              <div key={i} ref={(el) => (wrappersRef.current[i] = el)} className={`project-detail-image-wrapper ${brokenImages[i] ? 'no-image-bg' : ''}`}>
                {!brokenImages[i] ? (
                  <div className="parallax-inner">
                    <Image src={src} alt={`${project.title} image ${i + 1}`} width={800} height={800} className="project-detail-image" onError={() => handleImageError(i)} />
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="project-detail-image-wrapper no-image-bg" />
          )}
        </div>

        <div className="project-detail-next-wrapper">
          <span className="font-secondary">Next</span>
          <TransitionLink href={`/projects/${nextProject.slug}`} className="project-detail-next">
            {nextProject.title}
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
