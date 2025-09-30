'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/hero.css';

export default function Hero() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.set(boxRef.current, { scaleY: 0, transformOrigin: 'center center' });

    const openHero = () => {
      gsap.to(boxRef.current, {
        scaleY: 1,
        duration: 1,
        ease: 'power4.out',
      });
    };

    window.addEventListener('hero-open', openHero);
    return () => window.removeEventListener('hero-open', openHero);
  }, []);

  return (
    <section id="hero">
      <div className="container">
        <div className="box-wrapper">
          <div className="box" ref={boxRef}>
            <h1>Danu Pratama</h1>
            <div>
              <h2>Web Developer</h2>
              <h3>Focused on building clean, modern web experiences.</h3>
              <span className="location">&mdash; based in Jakarta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
