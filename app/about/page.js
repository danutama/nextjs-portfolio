import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'About Me | Danu Pratama',
  description: 'Learn more about Danu Pratama, a passionate Web Developer.',
};

export default function AboutPage() {
  return (
    <main>
      <About />
      <Footer />
    </main>
  );
}
