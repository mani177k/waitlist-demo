import React from 'react';
import WaitlistForm from './WaitlistForm';

const FinalCTA = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/10 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm p-8 md:p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Ready to <span className="text-[var(--brand-primary)]">10x</span> Your Productivity?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8">
            Join the waitlist and be among the first to experience the future of bank statement processing.
          </p>
          
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-[var(--brand-primary)]">500+</p>
              <p className="text-gray-400 text-sm">CAs Registered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--brand-primary)]">10,000+</p>
              <p className="text-gray-400 text-sm">Statements</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--brand-primary)]">95%</p>
              <p className="text-gray-400 text-sm">Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--brand-primary)]">90 sec</p>
              <p className="text-gray-400 text-sm">Avg Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
