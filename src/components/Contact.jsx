import { useState } from 'react';

function Contact() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

  // replaces: submitForm(e) with setTimeout fake send
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      e.target.reset();
      setStatus('sent');
    }, 1200);
  };

  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        <h2 className="section-title light">Contact Us</h2>
        <div className="contact-layout">
          <div className="contact-left">
            <div className="map-wrap">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1028.8924609607748!2d-73.96476995829578!3d40.76781370089419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1772840836047!5m2!1sen!2sus" 
                      width="600" height="450" style={{border:0}} 
                      allowFullScreen loading="lazy" title="map"/>
            </div>
          </div>
          <div className="contact-right">
            <form onSubmit={handleSubmit}>
              <h3 className="form-title">Send Us a Message</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="example@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Phone (optional)</label>
                <input type="tel" placeholder="+1 (123) 456-7890" />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea rows="5" placeholder="Enter your message here..." required />
              </div>
              <button type="submit" className="btn-primary full"
                      disabled={status === 'sending'}
                      style={status === 'sent' ? { background: '#3c8c3c' } : {}}>
                {status === 'idle'    && <><i className="fas fa-paper-plane"></i> Send Message</>}
                {status === 'sending' && 'Sending...'}
                {status === 'sent'    && '✓ Sent!'}
              </button>
              {status === 'sent' && (
                <div className="form-success">
                  ✅ Thank you for responding! We'll respond as soon as possible.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;