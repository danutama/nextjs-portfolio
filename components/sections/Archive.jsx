'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import '../css/archive.css';

export default function Archive() {
  const titleRef = useRef(null);
  const imagesWrapperRef = useRef(null);

  const archiveItems = [
    { src: '/archive1.jpg' },
    { src: '/archive4.jpg' },
    { src: '/archive3.jpg' },
    { src: '/archive2.jpg' },
    { src: '/archive5.jpg' },
    { src: '/archive6.jpg' },
    { src: '/archive7.webp' },
    { src: '/archive8.webp' },
    { src: '/archive9.webp' },
    { src: '/archive10.webp' },
    { src: '/archive11.webp' },
  ];

  const text = 'Archive ';
  const count = `(${archiveItems.length})`;

  useLayoutEffect(() => {
    const charInners = titleRef.current.querySelectorAll('.char-inner');

    gsap.set(charInners, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      willChange: 'clip-path',
    });

    const tl = gsap.timeline({ delay: 0.8 });

    tl.to(charInners, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.08,
    });

    // Images fade in
    const imageItems = imagesWrapperRef.current.querySelectorAll('.image-item');
    gsap.set(imageItems, { opacity: 0, y: 20 });
    gsap.to(imageItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      delay: 1,
    });
  }, []);

  return (
    <section id="archive">
      <div className="container">
        <h2 ref={titleRef} className="reveal-title">
          {text.split('').map((c, i) => (
            <span className="char" key={`text-${i}`}>
              <span className="char-inner">{c === ' ' ? '\u00A0' : c}</span>
            </span>
          ))}

          <span className={`char archive-count archive-count-${archiveItems.length}`}>
            <span className="char-inner">{count}</span>
          </span>
        </h2>

        <div ref={imagesWrapperRef} className="archive-images-wrapper">
          {archiveItems.map((item, index) => (
            <div className="image-item" key={index}>
              <div className="image-box">
                <Image src={item.src} alt={item.label} width={350} height={350} priority />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
