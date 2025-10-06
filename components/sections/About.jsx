'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Image from 'next/image';
import '../css/about.css';

export default function About() {
  const wrapperRef = useRef(null);
  const h2Ref = useRef(null);
  const hrRefs = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // data skill
  const skills = [
    {
      title: 'Company Profile',
      subtitle: 'Website',
      desc: 'Create a professional online presence that represents your brand and builds trust.',
    },
    {
      title: 'Landing Page',
      subtitle: 'Website',
      desc: 'Goal-oriented pages that engage visitors and capture leads effectively.',
    },
    {
      title: 'Personal Portfolio',
      subtitle: 'Website',
      desc: 'Showcase your skills, projects, and achievements in a memorable way.',
    },
    {
      title: 'Blog / News',
      subtitle: 'Website',
      desc: 'Share your insights, updates, and stories with your audience.',
    },
    {
      title: 'Others',
      subtitle: 'Web Application',
      desc: 'Develop tailored web applications to meet your business requirements.',
    },
  ];

  const expertises = [
    {
      title: 'Frontend',
      subtitle: 'Development',
      desc: 'HTML, CSS, Bootstrap, React.js, Next.js, Axios, Vite, GSAP',
    },
    {
      title: 'Backend',
      subtitle: 'Development',
      desc: 'PHP, Laravel, Node.js, Express, Supabase, MySQL, PostgreSQL',
    },
    {
      title: 'Tools',
      subtitle: '& others',
      desc: 'GitHub, Visual Studio Code, Vercel, Netlify, Webflow',
    },
  ];

  useEffect(() => {
    const hrs = hrRefs.current;
    hrs.forEach((hr) => {
      gsap.set(hr, { scaleX: 0, transformOrigin: 'left center' });

      gsap.to(hr, {
        scaleX: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: hr,
          start: 'top 80%',
        },
      });
    });
  }, []);

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

  useEffect(() => {
    const elements = gsap.utils.toArray('.text-animate');
    elements.forEach((el) => {
      gsap.set(el, {
        clipPath: 'inset(0 0 100% 0)',
      });

      gsap.to(el, {
        clipPath: 'inset(0% 0 0% 0)',
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="content">
          <div ref={wrapperRef} className="profile-img-wrapper">
            <Image src="/profile.webp" alt="Danu Pratama" width={300} height={400} className={`profile-img ${loaded ? 'visible' : ''}`} onLoad={() => setLoaded(true)} priority />
            <span className="font-secondary">Ja·karta [dʒəˈkɑːtə]</span>
          </div>
          <h2 ref={h2Ref}>
            ABOUT ME <i className="font-secondary">AS A</i> WEB DEVELOPER
          </h2>
        </div>

        <div className="about-description">
          <div className="about-intro">
            <p className="text-start text-animate">2021&mdash;present</p>
            <p className="text-start text-animate fw-normal">
              Hi, I'm Danu Pratama, a web developer focused on creating visually appealing and user-friendly web interfaces. <br />
              <br />I have experience developing complete web applications from frontend to backend, and I’m committed to delivering reliable digital solutions that meet each project's goals.
            </p>
          </div>

          <div className="skill">
            <h3 className="text-start skill-title">
              I can help you <i className="font-secondary">with</i>
            </h3>
            <p className="text-start skill-subtitle">Turning your ideas into reality on the web through design and development</p>

            {/* skill/service */}
            <div className="custom-skill-grid">
              {skills.map((s, i) => (
                <div key={i} className="custom-skill-card">
                  <div className="skill-wrapper custom">
                    <span className="skill-number text-animate">({i + 1})</span>

                    <p className="skill-item text-start text-animate">
                      {s.title} <br />
                      <span className="text-secondary small">{s.subtitle}</span>
                    </p>
                  </div>
                  <hr ref={(el) => (hrRefs.current[i] = el)} />
                </div>
              ))}
            </div>

            {/* -------------------------------------- */}

            <h4 className="sub-heading font-secondary fw-normal text-start">Expertise</h4>

            {/* expertise */}
            {expertises.map((e, i) => (
              <div key={i + skills.length}>
                <div className="skill-wrapper">
                  <p className="skill-item text-start text-animate">
                    {e.title} <br />
                    <span className="text-secondary small">{e.subtitle}</span>
                  </p>
                  <ul className="skill-list text-animate">
                    <li>{e.desc}</li>
                  </ul>
                </div>
                <hr ref={(el) => (hrRefs.current[i + skills.length] = el)} />
              </div>
            ))}
          </div>

          <h3 className="text-start">
            Let’s turn your <i className="font-secondary">ideas</i> into reality on the web.
          </h3>

          <div className="about-socials">
            <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
              (LinkedIn)
            </a>
            <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
              (GitHub)
            </a>
            <a href="mailto:danupratama.dev@gmail.com">(Email)</a>
          </div>
        </div>
      </div>
    </section>
  );
}
