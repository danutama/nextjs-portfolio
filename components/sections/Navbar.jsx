'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import '../css/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const infoRef = useRef([]);
  const router = useRouter();
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  const menuItems = ['Index', 'About', 'Projects', 'Contact'];
  const infoItems = ['danupratama.dev@gmail.com', 'Jakarta, Indonesia', `©${currentYear} Danu Pratama`, 'Plus Jakarta Sans, font by Tokotype'];

  // Setup GSAP
  useEffect(() => {
    gsap.set(menuRef.current, { y: '-100%' });
    gsap.set(linksRef.current, { y: '100%' });
    gsap.set(
      infoRef.current.map((p) => p.querySelector('span')),
      { y: '100%' }
    );
  }, []);

  // Animasi saat open berubah
  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current, { y: 0, duration: 0.8, ease: 'power3.out' });

      gsap.to(linksRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.3,
      });

      gsap.to(
        infoRef.current.map((p) => p.querySelector('span')),
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.5,
        }
      );
    } else {
      gsap.to(
        infoRef.current.map((p) => p.querySelector('span')),
        {
          y: '100%',
          duration: 0.5,
          ease: 'power3.in',
          stagger: { each: 0.1, from: 'end' },
        }
      );

      gsap.to(linksRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power3.in',
        stagger: { each: 0.1, from: 'end' },
      });

      gsap.to(menuRef.current, { y: '-100%', duration: 0.5, ease: 'power3.in', delay: 0.5 });
    }
  }, [open]);

  const handleLinkClick = (href) => {
    gsap.to(
      infoRef.current.map((p) => p.querySelector('span')),
      {
        y: '100%',
        duration: 0.5,
        ease: 'power3.in',
        stagger: { each: 0.1, from: 'end' },
      }
    );

    gsap.to(linksRef.current, {
      y: '100%',
      duration: 0.5,
      ease: 'power3.in',
      stagger: { each: 0.1, from: 'end' },
    });

    gsap.to(menuRef.current, {
      y: '-100%',
      duration: 0.5,
      ease: 'power3.in',
      delay: 0.5,
      onComplete: () => {
        setOpen(false);
        router.push(href);
      },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">dp</h1>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div ref={menuRef} className="menu-overlay">
        <ul>
          {menuItems.map((item, i) => {
            const href = item === 'Index' ? '/' : `/${item.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <li key={item} className="menu-item">
                <button className={`menu-link ${isActive ? 'active' : ''}`} ref={(el) => (linksRef.current[i] = el)} onClick={() => handleLinkClick(href)}>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="menu-info">
          <h3>dp</h3>
          {infoItems.map((text, i) => (
            <p key={i} ref={(el) => (infoRef.current[i] = el)}>
              <span>{text}</span>
            </p>
          ))}
        </div>
      </div>
    </nav>
  );
}
