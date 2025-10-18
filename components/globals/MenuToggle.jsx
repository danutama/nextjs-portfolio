'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMenu } from '@/context/MenuContext';

export default function MenuToggle() {
  const { open, setOpen } = useMenu();
  const menuRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    gsap.set(menuRef.current, { y: 0 });
    gsap.set(closeRef.current, { y: '100%' });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.45, ease: 'power3.inOut' },
    });

    if (open) {
      tl.to(menuRef.current, { y: '-100%' }, 0).to(closeRef.current, { y: '0%' }, 0.25);
    } else {
      tl.to(closeRef.current, { y: '-100%' }, 0).set(closeRef.current, { y: '100%' }).fromTo(menuRef.current, { y: '100%' }, { y: '0%' }, 0.25);
    }
  }, [open]);

  return (
    <button className="menu-btn" onClick={() => setOpen(!open)}>
      <span className="flip-wrapper">
        <span ref={menuRef} className="flip-text">
          Menu
        </span>
        <span ref={closeRef} className="flip-text">
          Close
        </span>
      </span>
    </button>
  );
}
