import TransitionLink from '@/components/globals/TransitionLink';

export default function NotFound() {
  return (
    <main className="notfound-container">
      <span className="notfound-404">404</span>
      <div className="notfound-text-wrapper">
        <h1 className="notfound-title">Project Not Found</h1>
        <p className="notfound-text fw-normal">The project you are looking for doesn’t exist or has been removed.</p>
        <TransitionLink href="/" className="notfound-btn">
          Back to Index
        </TransitionLink>
      </div>
    </main>
  );
}
