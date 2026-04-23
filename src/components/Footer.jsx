function Footer() {
  return (
    <footer id="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <div className="logo">
            <span className="logo-icon">🍔</span>
            <span className="logo-text">Foodies</span>
          </div>
          <p>American Fast Food Restaurant</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Business Hours</h4>
          <table className="hours-table">
            <tbody>
              <tr><td>Monday</td><td className="closed">Closed</td></tr>
              <tr><td>Tue - Thursday</td><td>12:00pm - 10:00pm</td></tr>
              <tr><td>Fri - Saturday</td><td>12:00pm - 11:00pm</td></tr>
              <tr><td>Sunday</td><td>12:00pm  9:00pm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer-bottom"><p>© 2026 Foodies. All rights reserved.</p></div>
    </footer>
  );
}

export default Footer;