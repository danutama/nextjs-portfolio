import Project from '@/components/sections/Project';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Projects | Danu Pratama',
  description: 'See my work — Creating engaging digital experiences through clean design and thoughtful development.',
};

export default function ProjectPage() {
  return (
    <main>
      <Project />
      <Footer />
    </main>
  );
}
