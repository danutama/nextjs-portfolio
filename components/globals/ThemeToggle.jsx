'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
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

  return (
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
  );
}
