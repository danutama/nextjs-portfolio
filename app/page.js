import Hero from '@/components/sections/Hero';
import Approach from '@/components/sections/Approach';
import ProjectList from '@/components/sections/ProjectList';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Approach />
      <ProjectList />
      <Footer />
    </main>
  );
}
