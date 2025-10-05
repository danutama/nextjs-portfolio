'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import '../css/hero.css';

export default function Hero() {
  const boxRef = useRef(null);
  const pathname = usePathname();
  const [showBox, setShowBox] = useState(false);
  const hasAnimated = useRef(false);

  const openHero = () => {
    if (!boxRef.current || hasAnimated.current) return;

    gsap.fromTo(
      boxRef.current,
      {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)', // hide 
      },
      {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', // open
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => (hasAnimated.current = true),
      }
    );
  };

  useEffect(() => {
    // Initial state
    setShowBox(false);

    // Reset box
    if (boxRef.current) {
      gsap.set(boxRef.current, {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
      });
    }

    // Listen for event
    const handleHeroOpen = () => {
      setShowBox(true);
      requestAnimationFrame(() => openHero());
    };

    window.addEventListener('hero-open', handleHeroOpen);

    return () => window.removeEventListener('hero-open', handleHeroOpen);
  }, []);

  // Reset when route changes
  useEffect(() => {
    if (pathname === '/') {
      hasAnimated.current = false;

      if (boxRef.current) {
        gsap.set(boxRef.current, {
          clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
        });
      }
    }
  }, [pathname]);

  return (
    <section id="hero">
      <div className="container">
        <div className="box-wrapper">
          {showBox && (
            <div className="box" ref={boxRef}>
              <div className="text-wrapper d-flex between">
                <h1>Danu Pratama</h1>
                <span className="version">(v4)</span>
              </div>

              <div className="info-wrapper">
                <div className="text-wrapper">
                  <h2>Web Developer</h2>
                </div>
                <div className="text-wrapper">
                  <h3>Focused on crafting clean and minimal web experiences with a timeless design.</h3>
                </div>
                <div className="text-wrapper">
                  <span className="location">Based in Jakarta, ID</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
