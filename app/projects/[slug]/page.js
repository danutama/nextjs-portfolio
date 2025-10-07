import ProjectDetail from '@/components/sections/ProjectDetail';
import TransitionLink from '@/components/globals/TransitionLink';
import '@/components/css/project_detail.css';
import projects from '@/data/project.json';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const metadata = {
  title: 'Project Detail | Danu Pratama',
};

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
