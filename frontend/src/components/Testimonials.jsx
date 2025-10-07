import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../mock';

const Testimonials = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join 500+ Forward-Thinking CAs
          </h2>
          <p className="text-gray-400 text-xl">
            Early adopters are already saving hours every week
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 
                       rounded-sm p-6 hover:border-purple-500/50 transition-all
                       transform hover:-translate-y-2 duration-300
                       animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
                <p className="text-[var(--brand-primary)] text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
