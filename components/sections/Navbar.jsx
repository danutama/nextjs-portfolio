'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../css/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  // start overlay
  useEffect(() => {
    gsap.set(menuRef.current, { y: '-100%' });
    gsap.set(linksRef.current, { y: '100%' });
  }, []);

  // animasi saat state berubah
  useEffect(() => {
    if (open) {
      // overlay turun
      gsap.to(menuRef.current, { y: 0, duration: 0.5, ease: 'power3.out' });

      gsap.to(linksRef.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
      });
    } else {
      gsap.to(linksRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power3.in',
        stagger: {
          each: 0.1,
          from: 'end',
        },
      });

      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.5,
      });
    }
  }, [open]);

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
          {['Home', 'About', 'Projects', 'Contact'].map((item, i) => (
            <li key={item} className="menu-item" onClick={() => setOpen(false)}>
              <a href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} ref={(el) => (linksRef.current[i] = el)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
