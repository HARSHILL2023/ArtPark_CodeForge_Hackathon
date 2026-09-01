import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import DemoPreview from '../components/landing/DemoPreview';
import ImpactSection from '../components/landing/ImpactSection';
import TechStack from '../components/landing/TechStack';
import Testimonials from '../components/landing/Testimonials';
import TrustStrip from '../components/landing/TrustStrip';
import PricingSection from '../components/landing/PricingSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import AuthModal from '../components/AuthModal';

export default function LandingPage({ darkMode, toggleDark }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <main className="bg-[#F5F3EE] dark:bg-[#0C0D0F] text-[#1B1B19] dark:text-[#F2F0EA] overflow-hidden min-h-screen relative font-sans transition-colors duration-150">
      <Navbar darkMode={darkMode} toggleDark={toggleDark} onOpenAuth={() => setIsAuthOpen(true)} />
      <Hero onOpenAuth={() => setIsAuthOpen(true)} />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <DemoPreview />
      <ImpactSection />
      <TechStack />
      <Testimonials />
      <TrustStrip />
      <PricingSection />
      <CTASection onOpenAuth={() => setIsAuthOpen(true)} />
      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        redirectTo="/dashboard"
      />
    </main>
  );
}
