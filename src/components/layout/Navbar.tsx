"use client";
import React, { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Mobile Menu Overlay - Placed outside nav to prevent backdrop-blur containing block issue */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-[#030712]/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center space-y-8 w-full px-6">
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`text-3xl sm:text-4xl font-extrabold font-heading tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 hover:from-sky-400 hover:to-indigo-500 transition-all duration-500 hover:scale-110 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${isMobileMenuOpen ? 150 + idx * 75 : 0}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <div 
            className={`mt-12 flex gap-6 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} 
            style={{ transitionDelay: `${isMobileMenuOpen ? 150 + navLinks.length * 75 : 0}ms` }}
          >
             <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold font-heading tracking-wide shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]">
               Hire Me
             </a>
          </div>
        </div>
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030712]/90 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] py-3' : 'bg-transparent py-5'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50">
        <div className="flex items-center justify-between">
          
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)] group-hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] transition-all duration-300">
              <Terminal size={20} className="text-white" />
            </div>
            <span className="text-2xl font-heading font-bold tracking-tighter text-white uppercase">
              {portfolioData.profile.name.split(' ')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">.DEV</span>
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-300 hover:text-sky-400 transition-colors relative group font-heading tracking-wide">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </>
  );
};