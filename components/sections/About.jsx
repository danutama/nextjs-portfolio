'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import '../css/about.css';

export default function About() {
  const wrapperRef = useRef(null);
  const h2Ref = useRef(null);

  // floating
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (window.innerWidth > 640) {
      const handleMouseMove = (e) => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const moveX = Math.max(Math.min(deltaX / 20, 20), -20);
        const moveY = Math.max(Math.min(deltaY / 20, 20), -20);

        wrapper.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      };

      const handleMouseLeave = () => {
        wrapper.style.transform = `translate(-50%, -50%)`;
      };

      window.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const h2 = h2Ref.current;
    if (!h2) return;

    gsap.set(h2, {
      clipPath: 'inset(0 0 100% 0)',
    });

    gsap.to(h2, {
      clipPath: 'inset(0% 0 0% 0)',
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.3,
    });
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="content">
          <div ref={wrapperRef} className="profile-img-wrapper">
            <Image src="/profile.jpg" alt="Profile picture" width={300} height={400} className="profile-img" priority />
          </div>
          <h2 ref={h2Ref}>ABOUT ME</h2>
        </div>

        <div className="about-description">
          <p className="text-start">
            My name is Danu Pratama, a web programmer working on small to medium-scale projects. I focus on creating web interfaces that are visually appealing, responsive, and user-friendly. I also have experience developing complete web
            applications, including both frontend and backend, helping to build functional web solutions that meet project needs.
          </p>

          <h3 className="text-start">Let’s turn your ideas into reality on the web.</h3>

          <div className="about-socials">
            <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
              (LinkedIn)
            </a>
            <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
              (GitHub)
            </a>
            <a href="mailto:danupratama.dev@gmail.com">(e-mail)</a>
          </div>
        </div>
      </div>
    </section>
  );
}
