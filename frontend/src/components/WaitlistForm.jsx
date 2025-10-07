import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
    setStatus('loading');
    
    try {
      // Real API submission
      const response = await axios.post(`${API}/waitlist`, {
        email: email,
        source: 'landing_page',
        user_agent: navigator.userAgent
      });
      
      if (response.data.success) {
        setStatus('success');
        
        // Show success for 3s, then reset
        setTimeout(() => {
          setEmail('');
          setStatus('idle');
        }, 3000);
      }
      
    } catch (error) {
      setStatus('error');
      
      // Handle specific error messages
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
      
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        {/* Glass Card Container */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 
                        rounded-sm p-2 shadow-2xl hover:shadow-[var(--brand-primary)]/20 
                        transition-all duration-300">
          
          <div className="flex flex-col md:flex-row gap-2">
            {/* Email Input */}
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                disabled={status === 'loading' || status === 'success'}
                className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 
                         rounded-none text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50
                         focus:border-[var(--brand-primary)]/50 focus:bg-white/10
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 text-lg"
              />
              
              {/* Email Icon */}
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 
                              text-gray-400 pointer-events-none" 
                    size={20} />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="h-14 px-8 bg-[var(--brand-primary)] text-black font-semibold 
                       rounded-none hover:bg-[var(--brand-hover)] hover:text-[var(--brand-primary)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-105 active:scale-95
                       transition-all duration-400
                       shadow-lg hover:shadow-[var(--brand-primary)]/50
                       flex items-center justify-center gap-2 min-w-[160px]"
            >
              {status === 'loading' && (
                <Loader2 className="animate-spin" size={20} />
              )}
              {status === 'success' && (
                <CheckCircle className="animate-bounce" size={20} />
              )}
              {status === 'idle' || status === 'error' ? (
                <>
                  Join Waitlist
                  <ArrowRight size={20} />
                </>
              ) : status === 'loading' ? (
                'Joining...'
              ) : (
                "You're In!"
              )}
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        {status === 'error' && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
            <AlertCircle size={16} />
            {errorMsg}
          </p>
        )}
        
        {/* Success Message */}
        {status === 'success' && (
          <p className="text-[var(--brand-primary)] text-sm mt-2 flex items-center gap-2">
            <CheckCircle size={16} />
            🎉 Awesome! Check your email for confirmation.
          </p>
        )}
      </div>
      
      {/* Privacy Notice */}
      <p className="text-gray-500 text-sm mt-4 text-center flex items-center justify-center gap-2 flex-wrap">
        <Lock size={14} />
        100% Secure • No spam, ever • Unsubscribe anytime
      </p>
    </form>
  );
};

export default WaitlistForm;
