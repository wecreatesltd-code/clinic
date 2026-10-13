import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import DoctorShowcase from './components/DoctorShowcase';
import BookingSection from './components/BookingSection';
import HealthCalculator from './components/HealthCalculator';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Handle Theme Switch
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  // Scroll to booking section smoothly
  const scrollToBooking = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    showToast(`Selected "${serviceTitle}" for your appointment.`);
    scrollToBooking();
  };

  const handleSelectDoctor = (doctorName, specialtyName) => {
    setSelectedDoctor(doctorName);
    showToast(`Selected Dr. ${doctorName} (${specialtyName})`);
    scrollToBooking();
  };

  return (
    <div className="clinic-app">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenBooking={scrollToBooking}
      />

      <main>
        <Hero
          onBookNow={scrollToBooking}
          onExploreServices={() => {
            const servEl = document.getElementById('services');
            if (servEl) servEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ServicesSection onSelectService={handleSelectService} />

        <DoctorShowcase onSelectDoctor={handleSelectDoctor} />

        <BookingSection
          preselectedDoctor={selectedDoctor}
          preselectedService={selectedService}
          onBookingSuccess={(msg) => showToast(msg)}
        />

        <HealthCalculator />
      </main>

      <Footer />

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}

export default App;
