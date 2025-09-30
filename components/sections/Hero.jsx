'use client';

import '../css/hero.css';

export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <div className="box-wrapper">
          <div className="box">
            <div className="text-wrapper d-flex between">
              <h1>Danu Pratama</h1>
              <span className="version">(v4)</span>
            </div>

            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>Web Developer</h2>
              </div>
              <div className="text-wrapper">
                <h3>Focused on crafting clean and minimal web experiences with a timeless design.</h3>
              </div>
              <div className="text-wrapper">
                <span className="location">Based in Jakarta, ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
