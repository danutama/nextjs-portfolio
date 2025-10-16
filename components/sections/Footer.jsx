'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
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
        trigger: text,
        start: 'top 85%',
        end: 'bottom bottom',
      },
    });
  }, []);

  return (
    <footer id="footer">
      <div className="container">
        <div className="cta">
          <h2 className="text-center">
            Interested in <span className="font-secondary">working</span> together?
          </h2>
          <p className="text-center">Get in touch</p>

          <div className="footer-contact">
            <a href="mailto:danupratama.dev@gmail.com">(Email)</a>
            <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
              (GitHub)
            </a>
            <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
              (LinkedIn)
            </a>
          </div>
        </div>

        <svg
          viewBox="0 0 1000 300"
          preserveAspectRatio="xMidYMax meet"
          style={{
            width: '100vw',
            height: 'auto',
            display: 'block',
          }}
        >
          <text ref={textRef} x="48%" y="45%" dominantBaseline="middle" textAnchor="middle" fontSize="320" fontWeight="700">
            <tspan fontSize="225" dy="70">
              &copy;
            </tspan>
            <tspan dx="5" dy="-20">
              danu
            </tspan>
          </text>
        </svg>
      </div>
    </footer>
  );
}
