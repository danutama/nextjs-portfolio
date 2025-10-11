import NotFound from '@/components/globals/NotFound';

export const metadata = {
  title: 'Page Not Found | Danu Pratama',
  description: 'Oops! The page you are looking for doesn’t exist in the portfolio.',
  alternates: {
    canonical: 'https://danu.is-a.dev/',
  },
  openGraph: {
    title: 'Page Not Found | Danu Pratama',
    description: 'Oops! The page you are looking for doesn’t exist in the portfolio.',
    siteName: 'Danu — Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function GlobalNotFound() {
  return (
    <main>
      <NotFound title="Page Not Found" message="The page you are looking for doesn’t exist. You can explore other parts of the site." buttonText="Back to Index" buttonHref="/" />
    </main>
  );
}
