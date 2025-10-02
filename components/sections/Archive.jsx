'use client';

import Image from 'next/image';
import '../css/archive.css';

export default function Archive() {
  const archiveItems = [
    { src: '/archive1.jpg', label: 'AR001' },
    { src: '/archive4.jpg', label: 'AR002' },
    { src: '/archive3.jpg', label: 'AR003' },
    { src: '/archive2.jpg', label: 'AR004' },
    { src: '/archive5.jpg', label: 'AR005' },
    { src: '/archive6.jpg', label: 'AR006' },
  ];

  return (
    <section id="archive">
      <div className="container">
        <h2>Archive</h2>
        <div className="archive-images-wrapper">
          {archiveItems.map((item, index) => (
            <div className="image-item" key={index}>
              <Image src={item.src} alt={item.label} width={250} height={350} priority />
              <span className="fw-normal small">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
