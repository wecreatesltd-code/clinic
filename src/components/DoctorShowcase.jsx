import { useState } from 'react';
import { doctors, specialties } from '../data/clinicData';

export default function DoctorShowcase({ onSelectDoctor }) {
  const [activeSpecialty, setActiveSpecialty] = useState('all');

  const filteredDoctors = doctors.filter((doc) => {
    return activeSpecialty === 'all' || doc.specialty === activeSpecialty;
  });

  return (
    <section id="doctors" className="section-padding doctors-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Medical Experts</span>
          <h2 className="section-title">Meet Our Dedicated Specialists</h2>
          <p className="section-subtitle">
            Our multi-disciplinary team combines decades of medical expertise with genuine empathy.
          </p>
        </div>

        {/* Specialty Filter */}
        <div className="doctor-filter-tabs">
          {specialties.map((spec) => (
            <button
              key={spec.id}
              className={`doc-filter-btn ${activeSpecialty === spec.id ? 'active' : ''}`}
              onClick={() => setActiveSpecialty(spec.id)}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className="doctors-grid">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-card-header">
                <div className="doc-avatar-wrapper">
                  <span className="doc-avatar-emoji">{doc.image}</span>
                </div>
                <span className="doc-specialty-badge">{doc.badge}</span>
              </div>

              <div className="doctor-card-body">
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-specialty-title">{doc.specialtyName}</p>
                <p className="doc-exp-text">💼 {doc.experience}</p>

                <div className="doc-rating-row">
                  <span className="rating-star">⭐ {doc.rating}</span>
                  <span className="rating-count">({doc.reviews} reviews)</span>
                </div>

                <div className="doc-availability">
                  <span className="avail-indicator"></span>
                  <span>{doc.availability}</span>
                </div>
              </div>

              <div className="doctor-card-footer">
                <button
                  className="btn btn-outline btn-full"
                  onClick={() => onSelectDoctor(doc.name, doc.specialtyName)}
                >
                  Book with {doc.name.split(' ')[1]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
