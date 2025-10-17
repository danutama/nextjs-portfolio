'use client';

import { useMenu } from '@/context/MenuContext';

export default function MenuToggle() {
  const { open, setOpen } = useMenu();

  return (
    <button className={`menu-btn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      {open ? 'Close' : 'Menu'}
    </button>
  );
}
