'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/globals/TransitionLink';
import '../css/hero.css';
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const boxRef = useRef(null);
  const pathname = usePathname();
  const [showBox, setShowBox] = useState(false);
  const hasAnimated = useRef(false);
  const isReady = useRef(false);

  const openHero = () => {
    if (!boxRef.current || hasAnimated.current) return;

    gsap.fromTo(
      boxRef.current,
      {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
      },
      {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          hasAnimated.current = true;
        },
      }
    );
  };

  // Reset state when pathname changes
  useEffect(() => {
    hasAnimated.current = false;
    setShowBox(false);
    isReady.current = false;

    if (boxRef.current) {
      gsap.set(boxRef.current, {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
      });
    }
  }, [pathname]);

  // Setup event listener dan trigger animation
  useEffect(() => {
    // Show box immediately on mount
    setShowBox(true);

    // Mark as ready after box is rendered
    requestAnimationFrame(() => {
      isReady.current = true;

      // Check if event was already fired
      if (window.__heroOpenTriggered) {
        delete window.__heroOpenTriggered;
        openHero();
      }
    });

    const handleHeroOpen = () => {
      if (isReady.current) {
        openHero();
      } else {
        // Store flag if component not ready yet
        window.__heroOpenTriggered = true;
      }
    };

    window.addEventListener('hero-open', handleHeroOpen);

    return () => {
      window.removeEventListener('hero-open', handleHeroOpen);
      delete window.__heroOpenTriggered;
    };
  }, [pathname]);

  // Only render on home page
  if (pathname !== '/') return null;

  useEffect(() => {
    const handleHeroScroll = (e) => {
      if (!boxRef.current) return;
      const progress = e.detail?.progress ?? 0;

      const adjusted = Math.min(progress / 0.85, 1);

      const bottom = 100 - adjusted * 100;
      const clipPath = `polygon(0 0, 100% 0, 100% ${bottom}%, 0 ${bottom}%)`;

      gsap.to(boxRef.current, {
        clipPath,
        ease: 'none',
        duration: 0.1,
        overwrite: 'auto',
      });
    };

    window.addEventListener('hero-scroll', handleHeroScroll);
    return () => window.removeEventListener('hero-scroll', handleHeroScroll);
  }, []);

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

        <div className="hero-bottom d-flex between">
          <span className="font-secondary fw-normal">scroll</span>
          <TransitionLink href="/about" className="hero-about-btn">
            Get to Know Me
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
