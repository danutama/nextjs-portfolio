'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import '../css/hero.css';

export default function Hero() {
  const boxRef = useRef(null);
  const nameRef = useRef([]);
  const infoRef = useRef([]);
  const pathname = usePathname();
  const [showBox, setShowBox] = useState(false);

  const openHero = () => {
    if (!boxRef.current) return;

    gsap.fromTo(
      boxRef.current,
      { height: '20vh' },
      {
        height: 500,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          gsap.to(nameRef.current, {
            y: '0%',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          });

          gsap.to(infoRef.current, {
            y: '0%',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          });
        },
      }
    );
  };

  useEffect(() => {
    setShowBox(true);

    nameRef.current.forEach((el) => {
      if (el) gsap.set(el, { y: '-100%' });
    });
    infoRef.current.forEach((el) => {
      if (el) gsap.set(el, { y: '-100%' });
    });

    window.addEventListener('hero-open', openHero);

    if (pathname === '/') {
      setTimeout(() => openHero(), 50);
    }

    return () => window.removeEventListener('hero-open', openHero);
  }, [pathname]);

  return (
    <section id="hero">
      <div className="container">
        <div className="box-wrapper">
          {showBox && (
            <div className="box" ref={boxRef}>
              <div className="text-wrapper">
                <h1 ref={(el) => (nameRef.current[0] = el)}>Danu Pratama</h1>
              </div>

              <div className="info-wrapper">
                <div className="text-wrapper">
                  <h2 ref={(el) => (infoRef.current[0] = el)}>Web Developer</h2>
                </div>
                <div className="text-wrapper">
                  <h3 ref={(el) => (infoRef.current[1] = el)}>Focused on building clean, modern web experiences.</h3>
                </div>
                <div className="text-wrapper">
                  <span className="location" ref={(el) => (infoRef.current[2] = el)}>
                    Based in Jakarta
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
