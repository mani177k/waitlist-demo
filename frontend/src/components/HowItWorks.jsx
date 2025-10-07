import React from 'react';
import { Upload, Cpu, Edit, Download } from 'lucide-react';
import { steps } from '../mock';

const iconMap = {
  0: Upload,
  1: Cpu,
  2: Edit,
  3: Download
};

const colorMap = {
  0: 'from-[var(--brand-primary)] to-blue-500',
  1: 'from-blue-500 to-purple-500',
  2: 'from-purple-500 to-pink-500',
  3: 'from-pink-500 to-yellow-500'
};

const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r 
                     from-[var(--brand-primary)] to-purple-400 bg-clip-text text-transparent
                     animate-fade-in-up">
          How It Works
        </h2>
        
        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = iconMap[index];
            const gradientClass = colorMap[index];
            return (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b 
                                from-[var(--brand-primary)] to-transparent hidden md:block" />
                )}
                
                <div className="flex gap-6 items-start">
                  {/* Step Number Circle */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientClass}
                                  flex items-center justify-center text-2xl font-bold shadow-lg 
                                  shadow-[var(--brand-primary)]/50`}>
                      {index + 1}
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-full bg-[var(--brand-primary)]/50 
                                  blur-xl animate-pulse" />
                  </div>
                  
                  {/* Step Content Card */}
                  <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 
                                rounded-sm p-6 md:p-8 hover:border-[var(--brand-primary)]/50 
                                transition-all duration-300 group transform hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 bg-gradient-to-br ${gradientClass} bg-opacity-20
                                      rounded-sm group-hover:scale-110 transition-transform`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-[var(--brand-primary)] text-sm font-medium">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
