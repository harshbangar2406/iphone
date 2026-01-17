import React, { useState, useCallback, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import AboutMeAI from "./components/AboutMeAI";
import SkillsChart from "./components/SkillsChart";
import ProjectDetail from "./components/ProjectDetail";
import ChatBot from "./components/ChatBot";
import Hero3DScene from "./components/Hero3DScene";
import { PROJECTS } from "./constants";
import { ViewState, Project } from "./types";
import {
  ChevronDown,
  ArrowRight,
  Layers,
  Video,
  ArrowUp,
} from "lucide-react";

interface TransitionInfo {
  id: string;
  rect: DOMRect;
  thumbnail: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [expandingProject, setExpandingProject] = useState<TransitionInfo | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const progressBar = document.getElementById('scroll-progress-bar');
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
      
      setShowScrollTop(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [view.type]);

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setExpandingProject({ id: project.id, rect, thumbnail: project.thumbnail });

    // Lock body scroll during transition
    document.body.style.overflow = 'hidden';

    // Shared layout animation timing
    setTimeout(() => {
      setView({ type: 'project-detail', projectId: project.id });
      setExpandingProject(null);
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }, 850);
  };

  const scrollToSection = useCallback((id: string) => {
    if (view.type !== 'home') {
      setView({ type: 'home' });
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [view.type]);

  if (view.type === 'project-detail') {
    return (
      <ProjectDetail 
        projectId={view.projectId} 
        onBack={() => {
          setView({ type: 'home' });
          window.scrollTo(0, 0);
        }} 
      />
    );
  }

  return (
    <div className={`min-h-screen bg-[#030014] text-slate-200 selection:bg-purple-500 selection:text-white transition-opacity duration-700 ${expandingProject ? 'opacity-30 blur-sm grayscale-[0.5] scale-[0.98]' : 'opacity-100 scale-100'}`}>
      <Navbar onNavigate={scrollToSection} />

      {/* Shared Layout Transition Element */}
      {expandingProject && (
        <div 
          className="shared-layout-expanding"
          style={{
            top: expandingProject.rect.top,
            left: expandingProject.rect.left,
            width: expandingProject.rect.width,
            height: expandingProject.rect.height,
            transform: 'scale(1)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'fixed',
            zIndex: 1000,
            borderRadius: '3rem',
            overflow: 'hidden'
          }}
          ref={(el) => {
            if (el) {
              requestAnimationFrame(() => {
                el.style.top = '0px';
                el.style.left = '0px';
                el.style.width = '100vw';
                el.style.height = '100vh';
                el.style.borderRadius = '0px';
              });
            }
          }}
        >
          <img 
            src={expandingProject.thumbnail} 
            className="w-full h-full object-cover" 
            alt="transition"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>
      )}

      <div className="origin-center">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030014]"
        >
          <Hero3DScene />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/40 via-transparent to-[#030014] pointer-events-none"></div>

          <div className="relative z-10 text-center px-6 max-w-5xl">
            <div className="flex items-center justify-center gap-3 mb-6 animate-reveal">
              <Video className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400/80 font-black tracking-[0.4em] uppercase text-[10px]">
                Narrative Architecture // Studio Edition
              </p>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-bold mb-8 tracking-tighter font-serif leading-[0.9] drop-shadow-2xl text-white animate-reveal">
              CRAFTING <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-teal-400 to-indigo-500 font-serif">
                EMOTION.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 md:mb-16 font-light leading-relaxed tracking-tight animate-reveal delay-100">
              We transform raw vision into cinematic rhythm. High-fidelity storytelling for the world's most innovative brands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center animate-reveal delay-200">
              <button
                onClick={() => scrollToSection("work")}
                className="liquid-glass-btn w-full sm:w-auto px-8 md:px-14 py-5 md:py-6 font-black uppercase tracking-[0.3em] text-[10px] group shadow-2xl"
              >
                The Work
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleProjectClick({ currentTarget: document.body } as any, PROJECTS[0])}
                className="liquid-glass-btn w-full sm:w-auto px-8 md:px-14 py-5 md:py-6 font-black uppercase tracking-[0.3em] text-[10px] group shadow-2xl"
              >
                Showreel 2025
                <ChevronDown className="ml-3 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("work")}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-white transition-colors animate-bounce flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Explore Catalog</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </section>

        {/* Selected Work - Masonry Grid */}
        <section
          id="work"
          className="py-24 md:py-40 px-6 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-purple-500/10 pb-12 gap-6 reveal-on-scroll">
            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-500">
                 <Layers className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">Selected Works</span>
              </div>
              <h2 className="text-5xl md:text-[6rem] font-bold font-serif italic tracking-tighter leading-none text-white">
                The Archive.
              </h2>
            </div>
          </div>

          <div className="masonry-grid">
            {PROJECTS.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </section>

        {/* AI Assistant Section */}
        <section
          id="ai-toolkit"
          className="py-24 md:py-40 bg-[#05001a] border-y border-purple-500/10 px-6 relative overflow-hidden dark-bg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.08),transparent)]"></div>
          <div className="relative z-10 reveal-on-scroll">
            <AboutMeAI />
          </div>
        </section>

        {/* About & Skills */}
        <section id="about" className="py-24 md:py-48 px-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="reveal-on-scroll">
              <h2 className="text-5xl md:text-[7rem] font-bold font-serif italic mb-8 md:mb-12 leading-[0.9] md:leading-[0.8] tracking-tighter text-white">
                Invisible <br /> Artistry.
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed text-lg md:text-2xl font-light">
                <p>We believe the best editing is felt, not noticed. It's the architecture of time, the pulse of emotion, and the bridge between concept and reality.</p>
              </div>
            </div>
            <div className="bg-[#05001a] rounded-[3rem] p-8 md:p-16 border border-purple-500/10 relative reveal-on-scroll">
              <SkillsChart />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-48 bg-[#0a0026] text-white px-6 relative overflow-hidden border-t border-purple-500/10 reveal-on-scroll">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-teal-400 font-black mb-4">Start a Conversation</p>
            <h3 className="text-3xl md:text-5xl font-serif italic font-bold tracking-tighter text-white mb-12">New Brief Inquiry</h3>
            <div className="bg-[#030014] p-10 md:p-20 rounded-[3rem] border border-purple-500/20">
              <p className="text-slate-400 font-light text-lg mb-8">Direct transmissions: studio@inertix.com</p>
              <button onClick={() => scrollToSection('contact')} className="liquid-glass-btn w-full py-6 font-black uppercase tracking-widest text-xs">Request Collaboration</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 bg-[#030014] text-slate-500 border-t border-purple-500/10 px-6 text-center">
          <p className="text-white text-[10px] tracking-[1em] uppercase font-black mb-4">Inertix Narrative Collective</p>
          <p className="text-slate-600 text-[9px] uppercase tracking-[0.6em] font-black">Global Operations // MMXXV</p>
        </footer>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 left-8 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white transition-all duration-500 hover:bg-purple-600 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      <ChatBot />
    </div>
  );
};

export default App;