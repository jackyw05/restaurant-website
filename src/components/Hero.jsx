function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay">
        <h1 className="hero-title">Foodies</h1>
        <p className="hero-subtitle">American Fast Food Restaurant</p>
        <div className="hero-btns">
          <a href="#menu" className="btn-primary">View Our Menu</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;