'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import '../css/transition.css';

export default function PageTransition() {
  const overlayRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const overlay = overlayRef.current;

    gsap.set(overlay, { autoAlpha: 0, clipPath: 'inset(100% 0 0 0)' });

    const runTransition = (callback) => {
      const tl = gsap.timeline();

      // overlay in
      tl.set(overlay, { autoAlpha: 1 });
      tl.to(overlay, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.inOut' });

      // run callback
      tl.add(() => {
        if (typeof callback === 'function') callback();
      }, '+=0.05');

      // overlay out
      tl.to(overlay, { clipPath: 'inset(0% 0 100% 0)', duration: 1, ease: 'power3.inOut' });

      // trigger hero-open
      tl.add(() => window.dispatchEvent(new Event('hero-open')), '+=0.05');

      // reset overlay
      tl.set(overlay, { autoAlpha: 0, clipPath: 'inset(100% 0 0 0)' });
    };

    const handlePageTransition = (e) => runTransition(e?.detail?.callback);
    const handlePopState = () => runTransition();

    window.addEventListener('page-transition', handlePageTransition);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('page-transition', handlePageTransition);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return <div ref={overlayRef} className="page-transition" aria-hidden />;
}
