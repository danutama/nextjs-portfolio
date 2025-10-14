'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/approach.css';
gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const headingRef = useRef(null);
  const principles = ['Clarity in code and design', 'Performance that feels invisible', 'Purpose over decoration', 'Empathy for the end user'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const buildAnimation = () => {
        const el = headingRef.current;
        if (!el) return;

        // split text
        const originalHTML = el.innerHTML;
        el.innerHTML = '';
        const temp = document.createElement('div');
        temp.innerHTML = originalHTML;
        const words = [];
        temp.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent.split(' ').forEach((word) => {
              if (!word.trim()) return;
              const span = document.createElement('span');
              span.textContent = word + ' ';
              el.appendChild(span);
              words.push(span);
            });
          } else {
            const clone = node.cloneNode(true);
            el.appendChild(clone);
            words.push(clone);
          }
        });

        const lines = [];
        let currentTop = null;
        let line = [];

        words.forEach((word) => {
          const rect = word.getBoundingClientRect();
          if (currentTop === null) currentTop = rect.top;
          if (Math.abs(rect.top - currentTop) > 2) {
            lines.push(line);
            line = [];
            currentTop = rect.top;
          }
          line.push(word);
        });
        if (line.length) lines.push(line);

        el.innerHTML = '';
        lines.forEach((wordsInLine) => {
          const div = document.createElement('div');
          div.classList.add('line');
          wordsInLine.forEach((w) => div.appendChild(w));
          el.appendChild(div);
        });

        const lineEls = el.querySelectorAll('.line');

        gsap.set(lineEls, {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            once: true,
          },
        });

        tl.to(lineEls, {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.05,
        });
      };

      buildAnimation();
      ScrollTrigger.addEventListener('refreshInit', buildAnimation);

      const handleScroll = () => {
        if (!document.querySelector('#hero')) return;
        const heroHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / heroHeight, 1);
        window.dispatchEvent(new CustomEvent('hero-scroll', { detail: { progress } }));
      };

      window.addEventListener('scroll', handleScroll);

      let lastHeight = window.innerHeight;
      let resizeTimeout;

      const handleResize = () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
          const newHeight = window.innerHeight;

          if (Math.abs(newHeight - lastHeight) > 120) {
            ScrollTrigger.refresh();
            lastHeight = newHeight;
          }
        }, 300);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.removeEventListener('refreshInit', buildAnimation);
      };
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach">
      <div className="container">
        <h2 ref={headingRef}>
          I build clean and efficient web interfaces, designed to be
          <span className="font-secondary"> timeless </span> and
          <span className="font-secondary"> purpose driven</span> with a focus on
          <span className="font-secondary"> clarity </span> and
          <span className="font-secondary"> performance</span>
        </h2>

        <div className="approach-items">
          {principles.map((point, index) => (
            <div key={index} className="approach-item-wrapper">
              <p className="fw-normal">{point}</p>
              <p className="fw-normal">({index + 1})</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
