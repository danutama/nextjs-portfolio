'use client';

import Image from 'next/image';
import TransitionLink from '@/components/globals/TransitionLink';
import projects from '../../data/project.json';
import '../css/project_detail.css';

export default function ProjectDetail({ project }) {
  // current
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);

  // next
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
            <p className="fw-normal">Technology</p>
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
          {project.detailImages?.map((src, i) => (
            <div key={i} className="project-detail-image-wrapper">
              <Image src={src} alt={`${project.title} image ${i + 1}`} fill className="project-detail-image" />
            </div>
          ))}
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
