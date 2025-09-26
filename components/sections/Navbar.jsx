'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import '../css/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('system');
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const infoRef = useRef([]);
  const router = useRouter();
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  const menuItems = ['Index', 'About', 'Projects', 'Archive'];
  const infoItems = ['danupratama.dev@gmail.com', 'Jakarta, Indonesia', `©${currentYear} Danu Pratama`, 'Plus Jakarta Sans by Tokotype', 'Playfair Display'];

  // --- THEME SETUP ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme('system'); // default
    }
  }, []);

  const applyTheme = (mode) => {
    let finalTheme = mode;

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      finalTheme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', finalTheme);
    setTheme(mode);
    localStorage.setItem('theme', mode);
  };

  // Setup GSAP
  useEffect(() => {
    gsap.set(menuRef.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    });
    gsap.set(linksRef.current, { y: '-100%' });
  }, []);

  // Animasi saat open berubah
  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.8,
        ease: 'power3.out',
      });

      // menu items
      gsap.fromTo(
        linksRef.current,
        { y: '-100%' }, // from top
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.2, from: 'end' },
          delay: 0.3,
        }
      );

      gsap.fromTo(
        infoRef.current.map((p) => p.querySelector('span')),
        { y: '-100%' }, // from top
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.1, from: 'end' },
          delay: 0.4,
        }
      );
    } else {
      // to bottom
      gsap.to(
        infoRef.current.map((p) => p.querySelector('span')),
        {
          y: '100%',
          duration: 0.3,
          ease: 'power3.in',
          stagger: { each: 0.1, from: 'end' },
        }
      );

      // to bottom
      gsap.to(linksRef.current, {
        y: '100%',
        duration: 0.4,
        ease: 'power3.in',
        stagger: { each: 0.1, from: 'end' },
      });

      // overlay tutup ke atas
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%)',
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.5,
        onComplete: () => {
          gsap.set(menuRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          });
        },
      });
    }
  }, [open]);

  const handleLinkClick = (href) => {
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(
          new CustomEvent('page-transition', {
            detail: {
              callback: () => router.push(href),
            },
          })
        );
      },
    });

    // 1. Close info
    tl.to(
      infoRef.current.map((p) => p.querySelector('span')),
      {
        y: '100%',
        duration: 0.3,
        ease: 'power3.in',
        stagger: { each: 0.1, from: 'end' },
      },
      0
    );

    // 2. Close links
    tl.to(
      linksRef.current,
      {
        y: '100%',
        duration: 0.4,
        ease: 'power3.in',
        stagger: { each: 0.1, from: 'end' },
      },
      0
    );

    // 3. Close overlay menu
    tl.to(menuRef.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%)',
      duration: 0.5,
      ease: 'power3.in',
      delay: 0.5,
      onComplete: () => {
        gsap.set(menuRef.current, {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        });
        setOpen(false);
      },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">dp</h1>

        {/* Menu Toggle*/}
        <button className={`menu-btn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
        </button>
      </div>

      <div ref={menuRef} className="menu-overlay">
        <div>
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

          {/* THEME TOGGLE */}
          <div className="theme-toggle">
            <button onClick={() => applyTheme('light')} className={theme === 'light' ? 'active' : ''}>
              Light
            </button>
            <button onClick={() => applyTheme('dark')} className={theme === 'dark' ? 'active' : ''}>
              Dark
            </button>
            <button onClick={() => applyTheme('system')} className={theme === 'system' ? 'active' : ''}>
              System
            </button>
          </div>
        </div>

        <div className="menu-info">
          <h3>dp</h3>
          {infoItems.map((text, i) => (
            <p key={i} ref={(el) => (infoRef.current[i] = el)}>
              <span>{text}</span>
            </p>
          ))}

          <div className="menu-socials">
            <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
              (LinkedIn)
            </a>
            <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
              (GitHub)
            </a>
            <a href="https://danutama.github.io" target="_blank" rel="noopener noreferrer">
              (Portfolio v3)
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
