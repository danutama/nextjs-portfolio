import NotFound from '@/components/globals/NotFound';

export default function ProjectNotFound() {
  return (
    <main>
      <NotFound title="Project Not Found" message="The project you requested isn’t here anymore. Maybe check out my other builds?" buttonText="See Other Projects" buttonHref="/projects" />
    </main>
  );
}
