'use client';

import { useEffect, useRef, useState } from 'react';
import '../css/footer.css';

export default function Footer() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);

  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current || !textRef.current) return;

      const parentWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;

      if (textWidth > 0) {
        setScale(parentWidth / textWidth);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer" ref={containerRef}>
          <span ref={textRef} className="footer-text" style={{ transform: `scale(${scale})` }}>
            <span className="small fw-normal">&copy;</span>
            {year}
          </span>
        </div>

        <div className="footer-rights-wrapper">
          <div className="footer-rights">
            <span>Socials</span>
            <div className="footer-rights-item">
              <a href="mailto:danupratama.dev@gmail.com">Email</a>
              <a href="https://github.com/danutama" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/danu-agus-pratama" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="footer-rights">
            <div className="footer-rights-item">
              Available {month}&ndash;{year}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
