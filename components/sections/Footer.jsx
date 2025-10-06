'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;

    gsap.set(text, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    });

    gsap.to(text, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=60',
        end: 'bottom bottom',
      },
    });
  }, []);

  return (
    <footer id="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-contact">
          <a href="mailto:danupratama.dev@gmail.com">(Email)</a>
          <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
            (GitHub)
          </a>
          <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
            (LinkedIn)
          </a>
        </div>

        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '100vw',
            height: 'auto',
            display: 'block',
          }}
        >
          <text ref={textRef} x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="152" fontWeight="700">
            danupratama
          </text>
        </svg>
      </div>
    </footer>
  );
}
