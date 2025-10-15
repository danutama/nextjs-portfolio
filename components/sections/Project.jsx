'use client';
import useProjectThree from '@/hooks/useProjectThree';
import projects from '@/data/project.json';
import TransitionLink from '@/components/globals/TransitionLink';
import '@/components/css/project.css';

export default function Project() {
  useProjectThree();

  return (
    <section id="project">
      <div className="container">
        <div className="project-header">
          <span className="project-number">{projects.length}</span>
          <h2>
            <span className="font-secondary">Selected</span>
            <br />
            works
          </h2>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => {
            const number = String(i + 1).padStart(2, '0');
            return (
              <div key={project.slug} className="project-item">
                <TransitionLink href={`/projects/${project.slug}`} className="project-link">
                  <div className="project-image">
                    <img src={project.images?.[0]} alt={project.title} />
                  </div>
                </TransitionLink>
                <div className="project-info">
                  <span className="project-info-number">{number},</span>
                  <div>
                    <h3 className="project-title fw-normal font-secondary">{project.title}</h3>
                    <h4 className="project-role fw-normal">{project.role}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
