'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import '../css/archive.css';

export default function Archive() {
  const titleRef = useRef(null);

  const archiveItems = [
    { src: '/archive1.jpg', label: 'AR001' },
    { src: '/archive4.jpg', label: 'AR002' },
    { src: '/archive3.jpg', label: 'AR003' },
    { src: '/archive2.jpg', label: 'AR004' },
    { src: '/archive5.jpg', label: 'AR005' },
    { src: '/archive6.jpg', label: 'AR006' },
  ];

  const title = `Archive (${archiveItems.length})`;
  const chars = title.split('');

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    const charsEls = titleRef.current.querySelectorAll('.char-inner');

    gsap.set(charsEls, { y: 300 });

    gsap.to(charsEls, {
      y: 0,
      ease: 'power3.out',
      duration: 0.6,
      stagger: 0.10,
      delay: 0.3,
    });
  }, []);

  return (
    <section id="archive">
      <div className="container">
        <h2 ref={titleRef} className="reveal-title">
          {chars.map((c, i) => {
            const isNumberOrParen = /[0-9()]/.test(c);
            return (
              <span key={i} className={`char ${isNumberOrParen ? 'char-number' : ''}`}>
                <span className="char-inner">{c}</span>
              </span>
            );
          })}
        </h2>
        <div className="archive-images-wrapper">
          {archiveItems.map((item, index) => (
            <div className="image-item" key={index}>
              <Image src={item.src} alt={item.label} width={250} height={350} priority />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
