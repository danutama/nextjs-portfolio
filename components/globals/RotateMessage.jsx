'use client';

import { useEffect, useState } from 'react';

export default function RotateMessage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;

      const isPhone = window.innerHeight <= 600;

      setShow(isPhone && isLandscape);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!show) return null;

  return <div className="rotate-message">Please rotate your phone</div>;
}
