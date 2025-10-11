import TransitionLink from '@/components/globals/TransitionLink';

export default function NotFound({ title = 'Page Not Found', message = 'The page you are looking for doesn’t exist or has been removed.', buttonText = 'Back to Home', buttonHref = '/' }) {
  return (
    <div className="notfound-container">
      <span className="notfound-404">404</span>
      <div className="notfound-text-wrapper">
        <h1 className="notfound-title">{title}</h1>
        <p className="notfound-text fw-normal">{message}</p>
        <TransitionLink href={buttonHref} className="notfound-btn">
          {buttonText}
        </TransitionLink>
      </div>
    </div>
  );
}
