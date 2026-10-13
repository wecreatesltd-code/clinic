import { clinicInfo, testimonials } from '../data/clinicData';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      {/* Testimonials snippet */}
      <div className="container footer-testimonials-section">
        <div className="section-header text-center">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">What Our Patients Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testi-stars">{'⭐'.repeat(item.rating)}</div>
              <p className="testi-quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="testi-author">
                <strong>{item.author}</strong>
                <span>{item.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="brand-logo footer-logo">
              <span className="brand-icon">🩺</span>
              <div className="brand-text">
                <span className="brand-title">10Fingers</span>
                <span className="brand-subtitle">CARE CLINIC</span>
              </div>
            </div>
            <p className="footer-about">
              Delivering empathetic, modern, technology-enabled primary and specialized healthcare.
              Accredited by international healthcare quality standards.
            </p>
            <div className="footer-socials">
              <span className="social-pill">Facebook</span>
              <span className="social-pill">Twitter</span>
              <span className="social-pill">LinkedIn</span>
              <span className="social-pill">Instagram</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Departments</h4>
            <ul className="footer-links">
              <li><a href="#doctors">Cardiology & Heart Care</a></li>
              <li><a href="#doctors">Pediatrics & Child Health</a></li>
              <li><a href="#doctors">Dermatology & Aesthetics</a></li>
              <li><a href="#doctors">Orthopedics & Joint Care</a></li>
              <li><a href="#doctors">Neurology & Diagnostics</a></li>
              <li><a href="#doctors">Dental & Maxillofacial</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Clinical Services</a></li>
              <li><a href="#doctors">Our Medical Team</a></li>
              <li><a href="#health-calc">BMI & Health Calculator</a></li>
              <li><a href="#booking">Book Appointment</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-title">Clinic Hours & Contact</h4>
            <p className="footer-contact-item">
              📍 <strong>Location:</strong><br />
              {clinicInfo.address}
            </p>
            <p className="footer-contact-item">
              📞 <strong>Appointments:</strong><br />
              <a href={`tel:${clinicInfo.phone}`}>{clinicInfo.phone}</a>
            </p>
            <p className="footer-contact-item">
              🚨 <strong>Emergency 24/7:</strong><br />
              <a href={`tel:${clinicInfo.emergencyPhone}`} className="footer-emergency-text">
                {clinicInfo.emergencyPhone}
              </a>
            </p>
            <p className="footer-contact-item">
              🕒 <strong>Hours:</strong><br />
              {clinicInfo.hours}
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Patient Rights</a>
            <span>•</span>
            <a href="#">Terms of Care</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
