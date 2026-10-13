import { stats } from '../data/clinicData';

export default function Hero({ onBookNow, onExploreServices }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-pill-badge">
            <span className="live-dot"></span> Certified Multi-Specialty Clinic & Diagnostics
          </div>

          <h1 className="hero-heading">
            Exceptional Medical Care <br />
            <span className="gradient-text">Designed For Your Life.</span>
          </h1>

          <p className="hero-description">
            Experience warm, technology-driven clinical care at 10Fingers Clinic.
            From preventative screenings to world-class specialists and fast digital consultations,
            your family&apos;s wellness is in trusted hands.
          </p>

          <div className="hero-cta-group">
            <button className="btn btn-primary btn-lg" onClick={onBookNow}>
              <span>✨ Book An Appointment</span>
            </button>
            <button className="btn btn-outline btn-lg" onClick={onExploreServices}>
              <span>🩺 Explore Services</span>
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-avatars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="trust-label">
              <strong>4.9 / 5.0 Rating</strong> from 2,800+ patient reviews across clinics
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-main">
            <div className="doctor-badge-floating top-left">
              <span className="badge-icon">⚡</span>
              <div>
                <strong>Zero Wait Time</strong>
                <p>Digital Check-in</p>
              </div>
            </div>

            <div className="hero-center-graphic">
              <div className="pulse-ring"></div>
              <div className="medical-avatar-circle">
                <span className="large-emoji">🩺</span>
              </div>
              <h3>10Fingers Care Center</h3>
              <p className="hero-badge-sub">24/7 Outpatient & Emergency Ready</p>
            </div>

            <div className="doctor-badge-floating bottom-right">
              <span className="badge-icon">🛡️</span>
              <div>
                <strong>Board Certified</strong>
                <p>48+ MD Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container hero-stats-bar">
        <div className="stats-grid">
          {stats.map((item, index) => (
            <div key={index} className="stat-card">
              <span className="stat-icon">{item.icon}</span>
              <div className="stat-data">
                <div className="stat-number">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
