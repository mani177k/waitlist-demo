import React from 'react';
import WaitlistForm from './WaitlistForm';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-section min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000] animate-gradient" />
      
      {/* CSS 3D Floating Elements */}
      <div className="floating-cube-1" />
      <div className="floating-cube-2" />
      <div className="floating-sphere-1" />
      <div className="floating-sphere-2" />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none 
                          bg-gradient-to-r from-[var(--brand-primary)]/20 to-blue-500/20 
                          border border-[var(--brand-primary)]/30 backdrop-blur-xl mb-8
                          animate-fade-in">
            <span className="animate-pulse text-xl">✨</span>
            <span className="text-[var(--brand-primary)] text-sm font-medium tracking-wider">COMING SOON</span>
          </div>
          
          {/* Main Heading with Gradient */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up animation-delay-200">
            <span className="bg-gradient-to-r from-[var(--brand-primary)] via-white to-[var(--brand-primary)] 
                           bg-clip-text text-transparent animate-gradient-x">
              Avexo
            </span>
          </h1>
          
          {/* Typewriter Subtitle */}
          <h2 className="text-2xl md:text-4xl text-gray-300 mb-4 font-light animate-fade-in-up animation-delay-400">
            Convert Bank Statements to Excel in <span className="text-[var(--brand-primary)] font-semibold">90 Seconds</span>
          </h2>
          
          {/* Trust Indicator */}
          <p className="text-gray-400 mb-12 text-lg animate-fade-in-up animation-delay-600">
            The AI-powered tool trusted by <span className="text-[var(--brand-primary)] font-semibold">500+ CAs</span>
          </p>
          
          {/* Waitlist Form */}
          <div className="animate-fade-in-up animation-delay-800">
            <WaitlistForm />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white 
                 transition-colors duration-300 animate-bounce cursor-pointer z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
