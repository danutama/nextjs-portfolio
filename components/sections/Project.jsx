'use client';

import { useState } from 'react';
import projects from '@/data/project.json';
import TransitionLink from '../globals/TransitionLink';
import '../css/project.css';

export default function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section id="project">
      <div className="container">
        <div className="project-header">
          <h2>
            <span className="font-secondary fw-normal">Selected</span>
            <br />
            Projects <span className="project-number">({projects.length})</span>
          </h2>
        </div>

        <div className="project-content">
          <div className="project-main">
            <TransitionLink href={`/projects/${activeProject.slug}`} className="project-link">
              <div className="project-main-image">
                <img src={activeProject.images?.[0]} alt={activeProject.title} key={activeProject.slug} />
              </div>
            </TransitionLink>
            <div>
              <h3 className="project-main-title">{activeProject.title}</h3>
              <h4 className="project-main-role">{activeProject.role}</h4>
            </div>
          </div>

          <div className="project-thumbnails">
            {projects.map((p, i) => (
              <div key={p.slug} className={`project-thumb ${i === activeIndex ? 'active' : ''}`} onMouseEnter={() => setActiveIndex(i)}>
                <img src={p.images?.[0]} alt={p.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
