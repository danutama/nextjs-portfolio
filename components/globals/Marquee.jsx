'use client';

import { useEffect, useRef } from 'react';
import '../css/marquee.css';

export default function Footer() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 640) return;

    const el = marqueeRef.current;
    let offset = 0;
    const speed = 1;

    // duplicate teks >= 2 * layar
    while (el.scrollWidth < window.innerWidth * 2) {
      el.innerHTML += el.innerHTML;
    }

    const textWidth = el.scrollWidth / 2;

    function animate() {
      offset -= speed;
      if (Math.abs(offset) >= textWidth) {
        offset = 0;
      }
      el.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div id="marquee">
      <div className="marquee">
        <div className="marquee__inner" ref={marqueeRef}>
          <span>UNDER DEVELOPMENT</span>
        </div>
      </div>
    </div>
  );
}
