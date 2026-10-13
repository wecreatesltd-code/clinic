import { useState, useEffect } from 'react';
import { doctors, specialties } from '../data/clinicData';

export default function BookingSection({ preselectedDoctor, preselectedService, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    specialty: 'cardio',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '10:00 AM',
    consultationType: 'in-clinic', // 'in-clinic' | 'telehealth'
    notes: ''
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [errors, setErrors] = useState({});

  const availableSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  // Set default minimum date as tomorrow or today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (preselectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        doctor: preselectedDoctor
      }));
    }
  }, [preselectedDoctor]);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        notes: `Interest in: ${preselectedService}`
      }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Please select a date';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const assignedDoc = formData.doctor || (doctors.length > 0 ? doctors[0].name : 'Duty Doctor');

    const confirmedDetails = {
      ...formData,
      doctor: assignedDoc,
      bookingId: '10F-' + Math.floor(100000 + Math.random() * 900000)
    };

    setBookingConfirmed(confirmedDetails);
    onBookingSuccess(`Appointment booked successfully! ID: ${confirmedDetails.bookingId}`);
  };

  const handleReset = () => {
    setBookingConfirmed(null);
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      specialty: 'cardio',
      doctor: '',
      appointmentDate: '',
      appointmentTime: '10:00 AM',
      consultationType: 'in-clinic',
      notes: ''
    });
    setErrors({});
  };

  return (
    <section id="booking" className="section-padding booking-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Fast & Simple</span>
          <h2 className="section-title">Schedule Your Consultation</h2>
          <p className="section-subtitle">
            Skip the waiting room. Reserve your prioritized slot online in less than 60 seconds.
          </p>
        </div>

        <div className="booking-wrapper">
          {bookingConfirmed ? (
            <div className="booking-success-card">
              <div className="success-icon-badge">✅</div>
              <h2>Appointment Confirmed!</h2>
              <p className="success-subtitle">
                A confirmation SMS & email have been dispatched to <strong>{bookingConfirmed.phone}</strong>.
              </p>

              <div className="confirmation-details-box">
                <div className="detail-row">
                  <span className="detail-key">Booking Reference:</span>
                  <span className="detail-value highlight-badge">{bookingConfirmed.bookingId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Patient Name:</span>
                  <span className="detail-value">{bookingConfirmed.patientName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Consultant:</span>
                  <span className="detail-value">{bookingConfirmed.doctor}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Date & Time:</span>
                  <span className="detail-value">{bookingConfirmed.appointmentDate} at {bookingConfirmed.appointmentTime}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Type:</span>
                  <span className="detail-value">
                    {bookingConfirmed.consultationType === 'in-clinic' ? '🏥 In-Clinic Visit' : '💻 Video Telehealth'}
                  </span>
                </div>
              </div>

              <div className="success-action-row">
                <button className="btn btn-primary" onClick={handleReset}>
                  Book Another Appointment
                </button>
                <a href="#home" className="btn btn-outline">
                  Return to Top
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="booking-form-card">
              <div className="consultation-type-toggle">
                <button
                  type="button"
                  className={`type-toggle-btn ${formData.consultationType === 'in-clinic' ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, consultationType: 'in-clinic' }))}
                >
                  🏥 In-Clinic Visit
                </button>
                <button
                  type="button"
                  className={`type-toggle-btn ${formData.consultationType === 'telehealth' ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, consultationType: 'telehealth' }))}
                >
                  💻 Video Consultation
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="patientName">Patient Full Name *</label>
                  <input
                    id="patientName"
                    name="patientName"
                    type="text"
                    placeholder="e.g. Eleanor Hayes"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={errors.patientName ? 'input-error' : ''}
                  />
                  {errors.patientName && <span className="error-text">{errors.patientName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'input-error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. patient@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialty">Department / Specialty</label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                  >
                    {specialties
                      .filter((s) => s.id !== 'all')
                      .map((spec) => (
                        <option key={spec.id} value={spec.id}>
                          {spec.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="doctor">Preferred Doctor (Optional)</label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                  >
                    <option value="">Any Available Specialist</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} - {doc.specialtyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentDate">Appointment Date *</label>
                  <input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    min={todayStr}
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className={errors.appointmentDate ? 'input-error' : ''}
                  />
                  {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
                </div>
              </div>

              {/* Time slot picker */}
              <div className="slots-section">
                <label className="slots-label">Select Preferred Time Slot</label>
                <div className="slots-grid">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      className={`slot-chip ${formData.appointmentTime === slot ? 'active' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, appointmentTime: slot }))}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">Symptoms or Medical Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  placeholder="Describe any symptoms, previous treatments, or allergies..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-lg btn-full">
                  Confirm & Reserve Appointment ➔
                </button>
                <p className="privacy-note">
                  🔒 We protect your health data in compliance with medical confidentiality standards.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
