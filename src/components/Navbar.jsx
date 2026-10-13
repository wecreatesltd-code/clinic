import { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Navbar({ activeSection, theme, onToggleTheme, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Specialists', href: '#doctors' },
    { label: 'Health Tools', href: '#health-calc' },
    { label: 'Appointments', href: '#booking' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span>📍 {clinicInfo.address}</span>
            <span className="dot-divider">•</span>
            <span>🕒 Mon-Sat: 7:30 AM - 9:00 PM</span>
          </div>
          <div className="top-bar-right">
            <a href={`tel:${clinicInfo.emergencyPhone}`} className="emergency-badge">
              🚨 Emergency 24/7: <strong>{clinicInfo.emergencyPhone}</strong>
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar-main">
        <div className="container nav-content">
          <a href="#home" className="brand-logo">
            <span className="brand-icon">🩺</span>
            <div className="brand-text">
              <span className="brand-title">10Fingers</span>
              <span className="brand-subtitle">CARE CLINIC</span>
            </div>
          </a>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title="Toggle Light/Dark Theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button className="btn btn-primary nav-book-btn" onClick={onOpenBooking}>
              📅 Book Appointment
            </button>

            <button
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
