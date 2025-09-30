'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../css/loading.css';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const topRef = useRef(null);
  const middleRef = useRef(null);
  const bottomRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    let loaded = 0;
    let total = 0;
    const progress = { value: 0 };

    const resources = Array.from(document.querySelectorAll("img, link[rel='stylesheet'], script"));
    total = resources.length || 1;

    if (percentRef.current) gsap.set(percentRef.current, { y: '0%' });

    const updatePercent = () => {
      loaded++;
      const realPercent = (loaded / total) * 100;

      gsap.to(progress, {
        value: realPercent,
        duration: 0.3,
        ease: 'power1.out',
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = `${Math.round(progress.value)}%`;
          }
        },
        onComplete: () => {
          if (realPercent >= 100) {
            setTimeout(finishAnimation, 200);
          }
        },
      });
    };

    // Attach load listeners
    resources.forEach((res) => {
      if (res.complete || res.readyState === 'complete') {
        updatePercent();
      } else {
        res.addEventListener('load', updatePercent);
        res.addEventListener('error', updatePercent);
      }
    });

    // Fallback: fake progress if resources are too few
    gsap.to(progress, {
      value: 100,
      duration: 2,
      ease: 'linear',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.innerText = `${Math.round(progress.value)}%`;
        }
      },
      onComplete: () => setTimeout(finishAnimation, 200),
    });

    const finishAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => setShow(false),
      });

      // Open middle first
      tl.to(middleRef.current, {
        xPercent: 100,
        duration: 1,
        ease: 'power3.inOut',
      });

      // Then open top & bottom together with small delay
      tl.to(topRef.current, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, '+=0.1');
      tl.to(bottomRef.current, { yPercent: 100, duration: 0.8, ease: 'power3.inOut' }, '<');

      tl.add(() => {
        window.dispatchEvent(new Event('hero-open'));
      }, '-=0.5');

      tl.to(percentRef.current, { y: '100%', duration: 0.6, ease: 'power3.inOut' }, '<');
    };
  }, []);

  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="block top" ref={topRef}></div>
      <div className="block middle" ref={middleRef}></div>
      <div className="block bottom" ref={bottomRef}></div>
      <div className="percent">
        <p ref={percentRef}>0%</p>
      </div>
    </div>
  );
}
