'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import '../css/archive.css';

export default function Archive() {
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

  useLayoutEffect(() => {
    // Fade-in
    const imageItems = imagesWrapperRef.current.querySelectorAll('.image-item');
    gsap.set(imageItems, { opacity: 0, y: 20 });
    gsap.to(imageItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      delay: 0.5,
    });
  }, []);

  return (
    <section id="archive">
      <div className="container">
        <h1 className="archive-title">Archive — Playground</h1>

        <div ref={imagesWrapperRef} className="archive-images-wrapper">
          {archiveItems.map((item, index) => (
            <div className="image-item" key={index}>
              <div className="image-box">
                <Image src={item.src} alt="Archive Danu Pratama" width={350} height={350} priority />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
