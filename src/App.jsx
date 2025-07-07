import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectShowcase from './components/ProjectShowcase';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <ProjectShowcase />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;