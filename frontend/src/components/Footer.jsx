import React from 'react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[var(--brand-primary)] to-blue-400 
                         bg-clip-text text-transparent mb-3">
              Avexo
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered bank statement analyzer for CAs and SMEs. Convert statements to Excel in 90 seconds.
            </p>
            <p className="text-gray-500 text-xs">
              avexoai.com
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a href="mailto:hello@avexoai.com" 
                 className="flex items-center gap-2 text-gray-400 hover:text-[var(--brand-primary)] transition-colors text-sm">
                <Mail size={16} />
                hello@avexoai.com
              </a>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center 
                                     hover:bg-[var(--brand-primary)]/20 hover:border-[var(--brand-primary)] 
                                     border border-white/10 transition-all">
                  <Twitter size={18} className="text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center 
                                     hover:bg-[var(--brand-primary)]/20 hover:border-[var(--brand-primary)] 
                                     border border-white/10 transition-all">
                  <Linkedin size={18} className="text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Avexo. All rights reserved. Made with ❤️ for CAs and SMEs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
