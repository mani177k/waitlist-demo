import React from 'react';
import { Zap, Target, Shield, IndianRupee } from 'lucide-react';
import { features } from '../mock';

const iconMap = {
  0: Zap,
  1: Target,
  2: Shield,
  3: IndianRupee
};

const colorMap = {
  0: 'text-yellow-400',
  1: 'text-[var(--brand-primary)]',
  2: 'text-blue-400',
  3: 'text-purple-400'
};

const Solution = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-primary)]/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--brand-primary)] to-blue-400 
                       bg-clip-text text-transparent">
            The Solution: Avexo
          </h2>
          <p className="text-gray-400 text-xl">
            AI-powered extraction that just works
          </p>
        </div>
        
        {/* Before/After Stats */}
        <div className="relative mb-12">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center 
                        bg-black/80 backdrop-blur-xl border border-white/10 
                        rounded-sm p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-red-400 line-through">4 hours</p>
              <p className="text-gray-400 text-sm mt-2">Manual Entry</p>
            </div>
            <div className="w-px h-16 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)]">90 sec</p>
              <p className="text-gray-400 text-sm mt-2">With Avexo</p>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {features.map((feature, index) => {
            const Icon = iconMap[index];
            const colorClass = colorMap[index];
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 
                         rounded-sm p-6 hover:border-[var(--brand-primary)]/50 
                         transition-all duration-300 group
                         transform hover:-translate-y-2
                         animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className={`${colorClass} mb-4 group-hover:scale-110 transition-transform`} size={32} />
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;
