import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/sections/ProjectDetail';
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
      description: 'The requested project could not be found in the portfolio.',
      alternates: {
        canonical: 'https://danu.is-a.dev/projects',
      },
      openGraph: {
        title: 'Project Not Found | Danu Pratama',
        description: 'The requested project could not be found in the portfolio.',
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
  const canonicalUrl = `https://danu.is-a.dev/projects/${currentProject.slug}`;
  const keywords = [currentProject.title, 'Danu Pratama', 'Web Developer', 'Portfolio', ...(currentProject.technology || [])];

  return {
    title: `${currentProject.title} | Danu Pratama`,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${currentProject.title} | Danu Pratama`,
      description: metaDescription,
      url: canonicalUrl,
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
    notFound();
  }

  return (
    <main>
      <ProjectDetail project={currentProject} />
    </main>
  );
}
