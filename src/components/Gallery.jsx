import { useState, useEffect, useRef } from 'react';

const slides = [
  { src: '/images/burgers.jpg', cap: 'Burger' },
  { src: '/images/burger.jpg',   cap: 'Plain Burger' },
  { src: '/images/taco.jpg',     cap: 'Tacos' },
  { src: '/images/pizza.jpg',    cap: 'Pizza' },
  { src: '/images/burrito.jpg',  cap: 'Burritos' },
  { src: '/images/fries.jpg',    cap: 'Fries' },
  { src: '/images/chicken-nuggets.jpg', cap: 'Chicken Nuggets' },
  { src: '/images/soda.jpg',     cap: 'Soda' },
];

function visibleCount() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

function Gallery() {
  const [cur, setCur]       = useState(0);
  const [visible, setVisible] = useState(visibleCount());
  const trackRef            = useRef(null);
  const autoPlayRef         = useRef(null);
  const touchStartX         = useRef(0);

  const maxIndex = Math.max(0, slides.length - visible);

  const goTo = (n) => setCur(Math.max(0, Math.min(n, maxIndex)));

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCur(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
  };
  const stopAutoPlay = () => clearInterval(autoPlayRef.current);

  useEffect(() => {
    startAutoPlay();
    const handleResize = () => setVisible(visibleCount());
    window.addEventListener('resize', handleResize);
    return () => { stopAutoPlay(); window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const slideWidth = trackRef.current.children[0]?.offsetWidth ?? 0;
      trackRef.current.style.transform = `translateX(-${cur * slideWidth}px)`;
    }
  }, [cur, visible]);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <div className="slider-wrapper">
          <button className="slider-btn prev" onClick={() => goTo(cur - 1)}>&#10094;</button>

          <div className="slider-viewport"
               onMouseEnter={stopAutoPlay}
               onMouseLeave={startAutoPlay}>
            <div className="slider-track" ref={trackRef}>
              {slides.map((s, i) => (
                <div className="slide" key={i}>
                  <div className="slide-img"><img src={s.src} alt={s.cap} /></div>
                  <p className="slide-cap">{s.cap}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="slider-btn next" onClick={() => goTo(cur + 1)}>&#10095;</button>
        </div>

        <div className="slider-dots">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button key={i} className={`dot ${i === cur ? 'active' : ''}`}
                    onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;