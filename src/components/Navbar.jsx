import { useState, useEffect } from 'react';

function Navbar({ cart, onCartToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const totalItems = Object.values(cart).reduce((s, v) => s + v.qty, 0);

  useEffect(() => {
    // replaces: window.addEventListener('scroll', ...) for header + active nav link
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      const y = window.pageYOffset;
      sections.forEach(s => {
        if (y >= s.offsetTop - 100 && y < s.offsetTop + s.offsetHeight) {
          setActiveSection(s.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">Foodies</span>
        </a>

        {/* replaces: hamburger.addEventListener('click', ...) */}
        <button className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}>
          <span/><span/><span/>
        </button>

        <nav id="nav" className={menuOpen ? 'open' : ''}>
          {['home','menu','about','gallery','contact'].map(link => (
            <a key={link} href={`#${link}`}
               className="nav-link"
               style={{ color: activeSection === link ? 'var(--gold)' : '' }}
               onClick={() => setMenuOpen(false)}>  {/* replaces: nav-link click removes open */}
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </nav>

        <button className="cart-toggle" onClick={onCartToggle}>
          <i className="fas fa-shopping-basket"></i>
          <span className="cart-badge">{totalItems}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;