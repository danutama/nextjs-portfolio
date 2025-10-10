'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function NavbarLogo() {
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = logoRef.current.querySelectorAll('.char');

      gsap.set(chars, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });

      gsap.to(chars, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <a href="/" className="logo" ref={logoRef}>
      <span className="char">&copy;</span>
      <span className="char">d</span>
      <span className="char">a</span>
      <span className="char">n</span>
      <span className="char">u</span>
    </a>
  );
}
