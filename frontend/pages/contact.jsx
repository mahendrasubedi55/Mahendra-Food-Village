import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = "Contact Us - Mahendra Food Village";
  }, []);

  return (
    <div className="page page--contact">
      <div className="contact-wrapper">
        <section className="contact-hero">
          <span className="eyebrow">Get in touch</span>
          <h1>Visit Our Village Kitchen</h1>
          <p>
            We'd love to hear from you. Whether you have a question about our
            menu, want to book a table, or just want to say hello — reach out
            and we'll get back to you warm and fast.
          </p>
        </section>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3>Our Location</h3>
            <p>Village Main Road, Mahendra Nagar<br/>Near Old Market Square</p>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3>Call Us</h3>
            <p>+91 98765 43210<br/>+91 87654 32109</p>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h3>Email Us</h3>
            <p>hello@mahendrafoodvillage.com<br/>orders@mahendrafoodvillage.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Opening Hours</h3>
            <p>Mon - Sun: 10:00 AM - 11:00 PM<br/>Kitchen closes at 10:30 PM</p>
          </div>
        </div>

        <section className="contact-form-section">
          <div className="contact-form-card">
            <div className="contact-form-card__left">
              <span className="eyebrow">Send a message</span>
              <h2>We'd Love to Hear From You</h2>
              <p>
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <ul className="contact-perks">
                <li>Quick response from our kitchen team</li>
                <li>Catering &amp; event bookings available</li>
                <li>Custom menu requests welcome</li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="field">
                <span>Your Name</span>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="field">
                <span>Email Address</span>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="field">
                <span>Phone Number</span>
                <input type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="field">
                <span>Message</span>
                <textarea
                  className="contact-form__textarea"
                  placeholder="Tell us what's on your mind..."
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
