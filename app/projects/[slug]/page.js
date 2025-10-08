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
      openGraph: {
        title: 'Project Not Found | Danu Pratama',
        description: 'Project not found in portfolio.',
        siteName: 'Danu — Portfolio',
        locale: 'en_US',
        type: 'website',
      },
    };
  }

  const maxLength = 155;
  let metaDescription = currentProject.overview || '';
  if (metaDescription.length > maxLength) {
    metaDescription = metaDescription.slice(0, maxLength).trim() + '…';
  }

  const ogImage = currentProject.images?.[0] || '/og-image.png';

  const keywords = [currentProject.title, 'Danu Pratama', 'Web Developer', 'GitHub', ...(currentProject.technology || [])];

  return {
    title: `${currentProject.title} | Danu Pratama`,
    description: metaDescription,
    keywords,

    openGraph: {
      title: `${currentProject.title} | Danu Pratama`,
      description: metaDescription,
      url: `https://danu.is-a.dev/projects/${currentProject.slug}`,
      siteName: 'Danu — Portfolio',
      images: [
        {
          url: `https://danu.is-a.dev${ogImage}`,
          width: 1200,
          height: 1200,
          alt: currentProject.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${currentProject.title} | Danu Pratama`,
      description: metaDescription,
      images: [`https://danu.is-a.dev${ogImage}`],
    },
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
