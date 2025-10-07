import React from 'react';
import { Clock, AlertTriangle, Users, TrendingDown } from 'lucide-react';
import { problems } from '../mock';

const iconMap = {
  0: Clock,
  1: AlertTriangle,
  2: Users
};

const Problems = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 
                       bg-clip-text text-transparent">
            The Problem We're Solving
          </h2>
          <p className="text-gray-400 text-xl">
            Accountants and CAs waste 20+ hours every month on this
          </p>
        </div>
        
        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = iconMap[index];
            return (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 
                              rounded-sm blur-xl group-hover:blur-2xl transition-all duration-300 
                              opacity-0 group-hover:opacity-100" />
                
                {/* Card Content */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 
                              rounded-sm p-8 hover:border-red-500/50 transition-all duration-300
                              transform hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 
                                rounded-sm flex items-center justify-center mb-6 
                                group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-red-400" size={32} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {problem.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-red-400 font-semibold flex items-center gap-2">
                      <TrendingDown size={20} />
                      {problem.stat}
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

export default Problems;
