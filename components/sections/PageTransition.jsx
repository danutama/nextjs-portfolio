'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import '../css/transition.css';

export default function PageTransition() {
  const [count, setCount] = useState(15);
  const barsRef = useRef([]);
  const overlayRef = useRef(null);
  const router = useRouter();

  // update bar count based on screen size
  useEffect(() => {
    const updateCount = () => {
      setCount(window.innerWidth < 640 ? 5 : 15);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  useEffect(() => {
    const getBars = () => barsRef.current.filter(Boolean);

    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(getBars(), { yPercent: -100 });

    const runTransition = (callback) => {
      const bars = getBars();
      if (!bars.length) {
        callback?.();
        return;
      }

      const tl = gsap.timeline();

      // show
      tl.set(overlayRef.current, { autoAlpha: 1 });

      // enter
      tl.to(bars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: { each: 0.05, from: 'start' },
      });

      // callback
      tl.add(() => callback?.());

      // exit
      tl.to(
        bars,
        {
          yPercent: 100,
          duration: 0.4,
          ease: 'power2.in',
          stagger: { each: 0.05, from: 'start' },
        },
        '+=0.1'
      );

      // reset
      tl.set(overlayRef.current, { autoAlpha: 0 });
      tl.set(bars, { yPercent: -100 });
    };

    const showTransition = (e) => runTransition(e?.detail?.callback);
    window.addEventListener('page-transition', showTransition);

    const handlePopState = () => runTransition();
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('page-transition', showTransition);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, count]);

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} ref={(el) => (barsRef.current[i] = el)} className="bar" />
      ))}
    </div>
  );
}
