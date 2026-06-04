"use client";
import React, { useEffect, useRef } from 'react';
import { 
  Mail, ExternalLink, ChevronDown, Send, Briefcase, Code, GraduationCap,
  Trophy, Award
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Github, Linkedin } from '@/components/icons/SocialIcons';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Background3D } from '@/components/3d/Background3D';
import { InteractiveTorus } from '@/components/3d/InteractiveTorus';
import { Navbar } from '@/components/layout/Navbar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function App() {

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const revealElements = document.querySelectorAll('.reveal-element:not(.is-visible)');
      revealElements.forEach(el => observer.observe(el));
    };

    observeElements();
    const timeout = setTimeout(observeElements, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      subject: { value: string };
      message: { value: string };
      reset: () => void;
    };
    const name = target.name.value;
    const subject = target.subject.value;
    const message = target.message.value;
    
    const mailtoLink = `mailto:${portfolioData.profile.email}?subject=${encodeURIComponent(subject + " - " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name)}`;
    window.location.href = mailtoLink;
    target.reset();
  };

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#030712] overflow-x-hidden">
      <CustomCursor />
      <Background3D />
      <Navbar />

      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center z-10">
          <p className="text-sky-400 font-bold font-heading tracking-widest mb-4 uppercase reveal-element animate-pulse">
            Software Engineer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-6 tracking-tighter reveal-element drop-shadow-lg">
            {portfolioData.profile.name.split(' ')[0]} <span className="text-gradient">{portfolioData.profile.name.split(' ')[1]}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-300 font-light mb-8 reveal-element">
            {portfolioData.profile.title}
          </h2>
          <p className="text-slate-400 mb-10 text-base md:text-lg leading-relaxed max-w-2xl mx-auto reveal-element">
            {portfolioData.profile.bio}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 reveal-element">
            <a href="#projects" className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold font-heading tracking-wide hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:-translate-y-1 transition-all duration-300">
              View My Work
            </a>
            <a href="Akshesh_Resume.pdf" download="Akshesh_Resume.pdf" className="px-8 py-4 rounded-full border border-sky-500/50 text-sky-400 font-heading tracking-wide hover:bg-sky-500/10 hover:border-sky-400 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center gap-2">
              <span className="font-bold">Download Resume</span>
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-heading tracking-wide hover:border-slate-500 hover:text-white transition-all duration-300 bg-slate-900/50 backdrop-blur-sm">
              Contact Me
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-slate-500 hover:text-white">
            <ChevronDown size={32} />
          </a>
        </div>
      </section>

      <section id="about" className="py-24 relative z-10 border-b border-slate-800/50 bg-slate-900/40 backdrop-blur-md shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="reveal-element">
              <InteractiveTorus />
            </div>
            <div className="reveal-element">
              <h3 className="text-sm font-bold font-heading text-sky-400 uppercase tracking-widest mb-2 block">Who Am I</h3>
              <h4 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">Designing logic.<br/><span className="text-gradient">Shaping experiences.</span></h4>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                I am a full-cycle software builder committed to developing dynamic platforms. My goals focus heavily on system speeds, pixel-perfect accuracy, and rendering complex details with fluid interactives. I specialize in bridging the gap between scalable backend architecture and beautiful front-end designs.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 rounded-xl bg-sky-500/10 border border-sky-500/50 text-sky-400 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300">
                  Let's Talk
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto reveal-element mb-24 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-4" size={32} />
            <h3 className="text-3xl font-heading font-bold text-white mb-8">Hackathons & Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.achievements.map((achieve, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-start gap-4 text-left hover:border-yellow-500/50 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Award className="text-yellow-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-heading text-lg mb-1">{achieve.title}</h4>
                    <p className="text-slate-400 text-sm mb-3">{achieve.type}</p>
                    <span className="text-xs font-bold text-yellow-950 bg-yellow-400 px-3 py-1 rounded-full">{achieve.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950/80 rounded-3xl p-8 border border-slate-800 reveal-element shadow-2xl">
            {portfolioData.stats.map((stat, idx) => (
              <div key={idx} className="p-4 flex flex-col items-center justify-center group">
                <div className="text-5xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold font-heading text-slate-400 uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="skills" className="py-24 relative z-10 bg-slate-950/40 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-element flex flex-col items-center">
            <Code className="text-sky-400 mb-4" size={32} />
            <h3 className="text-4xl font-heading font-bold text-white">Technical Arsenal</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto reveal-element">
            {portfolioData.skills.map((skill, idx) => (
              <div key={idx} className="glass-panel px-6 py-3 rounded-full border border-slate-800 font-semibold text-slate-300 hover:text-white hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-element flex flex-col items-center">
            <Briefcase className="text-sky-400 mb-4" size={32} />
            <h3 className="text-4xl font-heading font-bold text-white">Experience & Education</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            <div>
              <h4 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3 reveal-element"><Briefcase size={24} className="text-sky-500" /> Work History</h4>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal-element">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 group-hover:border-sky-500 text-sky-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                      <Briefcase size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl border border-slate-800 hover:border-sky-500/50 transition-colors">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-2 gap-2">
                        <h5 className="font-bold font-heading text-white text-lg">{exp.role}</h5>
                        <span className="text-[10px] font-bold font-heading text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full whitespace-nowrap tracking-wide">{exp.period}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-400 mb-4">{exp.company}</p>
                      <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                        {exp.desc.map((d, i) => <li key={i} className="leading-relaxed">{d}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3 reveal-element"><GraduationCap size={24} className="text-indigo-500" /> Education</h4>
              <div className="space-y-6 reveal-element">
                 {portfolioData.education.map((edu, idx) => (
                   <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <h5 className="font-bold font-heading text-white text-lg leading-tight">{edu.degree}</h5>
                          <span className="text-xs font-bold font-heading text-indigo-400 whitespace-nowrap bg-indigo-500/10 px-2 py-1 rounded-md">{edu.score}</span>
                      </div>
                      <p className="text-slate-300 font-medium text-sm mb-2">{edu.institution}</p>
                      <div className="flex justify-between text-xs text-slate-500 uppercase tracking-wider font-bold mt-4">
                          <span>{edu.location}</span>
                          <span>{edu.period}</span>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="projects" className="py-24 relative z-10 bg-slate-950/40 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 reveal-element flex flex-col items-center">
            <Code className="text-sky-400 mb-4" size={32} />
            <h3 className="text-4xl font-heading font-bold text-white">Featured Projects</h3>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Innovative personal applications showcasing AI integration, full-stack architecture, and real-time capabilities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 max-w-5xl mx-auto">
            {portfolioData.projects.map((proj, idx) => (
              <div key={idx} className="group glass-panel rounded-2xl overflow-hidden reveal-element border border-slate-800 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col">
                <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 to-indigo-900/20 z-0"></div>
                  <Code size={48} className="text-slate-700 group-hover:text-sky-400/50 transition-colors z-10 group-hover:scale-110 duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-heading font-bold text-white group-hover:text-sky-400 transition-colors">{proj.title}</h4>
                    <span className="text-xs text-slate-500 font-mono font-bold tracking-wider">{proj.date}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold text-sky-300 bg-sky-900/30 border border-sky-800/50 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-16 reveal-element flex flex-col items-center">
            <Briefcase className="text-emerald-400 mb-4" size={32} />
            <h3 className="text-4xl font-heading font-bold text-white">Client & Enterprise Work</h3>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Production-grade applications built and delivered for real-world B2B clients and corporate infrastructures.</p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {portfolioData.clientProjects.map((proj, idx) => (
              <div key={idx} className="group glass-panel rounded-2xl overflow-hidden reveal-element border border-slate-800 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row bg-slate-950/80">
                <div className="p-8 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div>
                      <div className="text-xs font-heading text-emerald-400 font-bold mb-2 tracking-wider">{proj.date}</div>
                      <h4 className="text-2xl font-heading font-bold text-white group-hover:text-emerald-400 transition-colors">{proj.title}</h4>
                    </div>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all text-sm font-bold whitespace-nowrap">
                      View Live Link <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold text-emerald-300 bg-emerald-900/30 border border-emerald-800/50 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 relative z-10 bg-slate-950/50 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center mb-16 reveal-element flex flex-col items-center">
            <Send className="text-sky-400 mb-4" size={32} />
            <h3 className="text-4xl font-heading font-bold text-white">Get In Touch</h3>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>
          
          <form onSubmit={handleContactSubmit} className="max-w-md mx-auto mb-16 text-left reveal-element glass-panel p-8 rounded-2xl border border-slate-800">
            <div className="mb-6">
              <label htmlFor="name" className="block text-xs font-bold font-heading text-slate-400 uppercase mb-2">Your Name</label>
              <input type="text" id="name" name="name" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors" placeholder="John Doe" />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-xs font-bold font-heading text-slate-400 uppercase mb-2">Subject</label>
              <input type="text" id="subject" name="subject" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors" placeholder="Project Inquiry" />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-xs font-bold font-heading text-slate-400 uppercase mb-2">Message</label>
              <textarea id="message" name="message" required rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors" placeholder="Hello Akshesh..."></textarea>
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold font-heading tracking-wide hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300">
              Send Message <Send size={18} />
            </button>
          </form>

          <div className="flex justify-center gap-8 reveal-element">
            <a href={portfolioData.profile.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300">
              <Github size={28} />
            </a>
            <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 hover:-translate-y-1 transition-all duration-300">
              <Linkedin size={28} />
            </a>
            <a href={`mailto:${portfolioData.profile.email}`} className="text-slate-400 hover:text-indigo-400 hover:-translate-y-1 transition-all duration-300">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm relative z-10 border-t border-slate-900 bg-[#030712]">
        <p>Built with Next.js, Three.js & Tailwind CSS.</p>
        <p className="mt-2 text-xs">© {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
