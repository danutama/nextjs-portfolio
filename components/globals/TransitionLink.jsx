'use client';

import { useRouter } from 'next/navigation';

export default function TransitionLink({ href, children, className }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    const event = new CustomEvent('page-transition', {
      detail: {
        callback: () => router.push(href),
      },
    });

    window.dispatchEvent(event);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
