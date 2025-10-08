import ProjectDetail from '@/components/sections/ProjectDetail';
import TransitionLink from '@/components/globals/TransitionLink';
import '@/components/css/project_detail.css';
import projects from '@/data/project.json';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const currentProject = projects.find((p) => p.slug === slug);

  if (!currentProject) {
    return {
      title: 'Project Not Found | Danu Pratama',
      description: 'Project not found in portfolio.',
    };
  }

  const maxLength = 155;
  let metaDescription = currentProject.overview || '';
  if (metaDescription.length > maxLength) {
    metaDescription = metaDescription.slice(0, maxLength).trim() + '…';
  }

  return {
    title: `${currentProject.title} | Danu Pratama`,
    description: metaDescription,
  };
}

export default function ProjectDetailPage({ params }) {
  const { slug } = params;
  const currentProject = projects.find((p) => p.slug === slug);

  if (!currentProject) {
    return (
      <main className="container" style={{ padding: '8rem 0', minHeight: '100vh' }}>
        <h2 className="notfound-title">Project not found</h2>
        <TransitionLink href="/" className="notfound-btn">
          Back to Index
        </TransitionLink>
      </main>
    );
  }

  return (
    <main>
      <ProjectDetail project={currentProject} />
    </main>
  );
}
