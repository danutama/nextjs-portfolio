'use client';

import Image from 'next/image';
import TransitionLink from '@/components/globals/TransitionLink';
import projects from '../../data/project.json';
import '../css/project_list.css';

export default function ProjectList() {
  const projectCount = projects.length;

  return (
    <section id="project-list">
      <div className="container">
        <h2 className="project-list-heading">
          Selected Projects<span className="number">({String(projectCount).padStart(2, '0')})</span>
        </h2>
        <ul className="project-list-items">
          {projects.map((project) => (
            <li key={project.slug} className="project-list-card">
              <TransitionLink href={`/projects/${project.slug}`} className="project-list-card-link">
                <div className="project-list-card-text-wrapper">
                  <h3 className="project-list-card-title">{project.title}</h3>
                  <p className="project-list-card-desc fw-normal">{project.overview}</p>
                </div>

                <div className="project-list-card-image-wrapper">
                  <Image src={project.images?.[0] || '/projects/placeholder.png'} alt={project.title} fill className="project-list-card-image" />
                </div>
              </TransitionLink>
            </li>
          ))}
        </ul>
        <div className="project-list-nav-wrapper">
          <TransitionLink href="/projects" className="project-list-nav">
            view all projects  <span className="material-symbols-outlined">arrow_outward</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
