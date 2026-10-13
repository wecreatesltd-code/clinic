import { useState } from 'react';
import { services } from '../data/clinicData';

export default function ServicesSection({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Diagnostics', 'Consultation', 'Emergency', 'Pediatrics', 'Cardio', 'Therapy'];

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="section-padding services-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Clinical Excellence</span>
          <h2 className="section-title">Specialized Healthcare Services</h2>
          <p className="section-subtitle">
            Modern diagnostic tools, gentle bedside care, and personalized treatment plans for every stage of your life.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="services-toolbar">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="service-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search services or treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="service-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-top">
                <span className="service-icon-box">{service.icon}</span>
                {service.popular && <span className="popular-badge">Popular</span>}
              </div>
              <span className="service-category">{service.category}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              
              <div className="service-card-footer">
                <button
                  className="service-action-btn"
                  onClick={() => onSelectService(service.title)}
                >
                  Book Service ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="no-results-card">
            <span className="no-results-icon">🔎</span>
            <h3>No matching services found</h3>
            <p>Try searching for a different keyword or view all categories.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
