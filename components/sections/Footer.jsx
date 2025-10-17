'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/globals/TransitionLink';
import '../css/footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const textRef = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // for logo
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        start: 'top 90%',
        end: 'bottom bottom',
      },
    });
  }, []);

  return (
    <footer id="footer">
      <div className="container">
        <div className="cta">
          <div className="footer-title">
            <h2>
              Interested in <span className="font-secondary">working</span> together?
            </h2>
            <p>
              Let’s make something that <i className="font-secondary">feels right</i>.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <p className="fw-normal">pages</p>
              <div className="footer-nav">
                <TransitionLink href="/" className={pathname === '/' ? 'active' : ''}>
                  Index
                </TransitionLink>
                <TransitionLink href="/about" className={pathname === '/about' ? 'active' : ''}>
                  About
                </TransitionLink>
                <TransitionLink href="/projects" className={pathname === '/projects' ? 'active' : ''}>
                  Projects
                </TransitionLink>
                <TransitionLink href="/archive" className={pathname === '/archive' ? 'active' : ''}>
                  Archive
                </TransitionLink>
              </div>
            </div>

            <div>
              <p className="fw-normal">around the web</p>
              <div className="footer-contact">
                <a href="mailto:danupratama.dev@gmail.com">Email</a>
                <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://danutama.github.io" target="_blank" rel="noopener noreferrer">
                  v3
                </a>
              </div>
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 1000 250"
          preserveAspectRatio="xMinYMax meet"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        >
          <text ref={textRef} y={isMobile ? '50%' : '60%'} dominantBaseline="middle" textAnchor="start" className="font-logo" fontSize="275">
            <tspan fontSize="200">&copy;</tspan>
            <tspan dx="5" dy="10">
              danu
            </tspan>
          </text>
        </svg>
      </div>
    </footer>
  );
}
