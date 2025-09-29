'use client';

import { useEffect, useRef, useState } from 'react';
import '../css/footer.css';

export default function Footer() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);

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
            <span className="small fw-normal">&copy;</span>2025
          </span>
        </div>
      </div>
    </footer>
  );
}
