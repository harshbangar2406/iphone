import React, { useState } from 'react';
import { ArrowLeft, Play, Share2, Layers, ExternalLink } from 'lucide-react';
import { PROJECT_DETAILS } from '../constants';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const [isPlayingHero, setIsPlayingHero] = useState(false);
  const [activeShotId, setActiveShotId] = useState<number | null>(null);
  const data = PROJECT_DETAILS[projectId];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white px-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-serif italic mb-4">Project Data Missing</h2>
          <button onClick={onBack} className="text-purple-400 uppercase tracking-widest text-xs font-black">Return Home</button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Project archive link synced to clipboard.');
  };

  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 animate-reveal">
      {/* Hero Header / Video Player */}
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-black group/hero">
        {!isPlayingHero ? (
          <>
            <div className="w-full h-full overflow-hidden">
              <img 
                src={data.heroImage} 
                className="w-full h-full object-cover opacity-30 scale-105 transition-transform duration-[15s] group-hover/hero:scale-100"
                alt={data.title}
              />
            </div>
            {/* Play Button Overlay */}
            {data.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <button 
                  onClick={() => setIsPlayingHero(true)}
                  className="group/play bg-white/10 hover:bg-purple-600 backdrop-blur-xl border border-white/20 p-6 md:p-10 rounded-full text-white transition-all duration-700 hover:scale-110 shadow-[0_0_50px_rgba(147,51,234,0.4)] active:scale-95"
                  aria-label="Play Project Video"
                >
                  <Play className="w-8 h-8 md:w-14 md:h-14 fill-current group-hover/play:scale-110 transition-transform translate-x-1" />
                  <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-2xl animate-pulse group-hover/play:bg-purple-600/40"></div>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full animate-reveal">
            <video 
              src={data.videoUrl} 
              className="w-full h-full object-cover" 
              autoPlay 
              controls 
              onEnded={() => setIsPlayingHero(false)}
            />
          </div>
        )}

        <div className={`absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent pointer-events-none transition-opacity duration-1000 ${isPlayingHero ? 'opacity-30' : 'opacity-100'}`}></div>
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-40">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 md:gap-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 px-5 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-xl transition-all group font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] shadow-glow-hover"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        {/* Project Info Overlay */}
        {!isPlayingHero && (
          <div className="absolute bottom-10 left-6 right-6 md:bottom-16 md:left-16 md:right-16 z-20 max-w-6xl pointer-events-none animate-reveal">
            <div className="flex items-center gap-2 md:gap-3 text-purple-400 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 text-[8px] md:text-[10px]">
              <Layers className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
              Project Archive ID // {projectId.toUpperCase()}
            </div>
            <h1 className="text-4xl md:text-[8rem] font-bold font-serif italic mb-6 md:mb-10 leading-[1] md:leading-[0.8] tracking-tighter drop-shadow-2xl">
              {data.title}
            </h1>
            <div className="flex flex-wrap gap-6 md:gap-12 text-slate-400">
              <div className="border-l border-white/10 pl-4 md:pl-6">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-slate-600 mb-1 md:mb-2">Partner</p>
                <p className="font-medium text-slate-200 text-sm md:text-lg">{data.client}</p>
              </div>
              <div className="border-l border-white/10 pl-4 md:pl-6">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-slate-600 mb-1 md:mb-2">Released</p>
                <p className="font-medium text-slate-200 text-sm md:text-lg">{data.year}</p>
              </div>
              <div className="border-l border-white/10 pl-4 md:pl-6">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-slate-600 mb-1 md:mb-2">Mandate</p>
                <p className="font-medium text-slate-200 text-sm md:text-lg">{data.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The Shots Grid */}
      <section className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
           <div>
              <h2 className="text-3xl md:text-5xl font-serif italic mb-3 md:mb-4">Visual Continuity</h2>
              <p className="text-slate-500 max-w-xl text-base md:text-lg font-light">An anatomical breakdown of the primary visual motifs and sequence architecture.</p>
           </div>
           <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/40">Sequence Analysis v1.0</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {data.shots.map((shot) => (
            <div key={shot.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 mb-6 md:mb-8 bg-black shadow-2xl aspect-video">
                {activeShotId !== shot.id ? (
                  <>
                    <div className="w-full h-full overflow-hidden">
                      <img 
                        src={shot.image} 
                        alt={shot.title}
                        className="w-full h-full object-cover opacity-60 transition-all duration-1000 md:group-hover:scale-110 group-hover:opacity-100"
                      />
                    </div>
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 glass px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/10 z-20">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">{shot.aspect}</span>
                    </div>
                    {/* Play Button Overlay for Shot */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <button 
                        onClick={() => setActiveShotId(shot.id)}
                        className="p-4 md:p-6 rounded-full bg-white text-black shadow-glow transform transition-all duration-500 hover:scale-125 active:scale-90 group-hover:bg-purple-600 group-hover:text-white"
                      >
                        <Play className="w-5 h-5 md:w-8 md:h-8 fill-current translate-x-0.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <video 
                    src={shot.videoUrl} 
                    className="w-full h-full object-cover animate-reveal" 
                    autoPlay 
                    controls 
                    onEnded={() => setActiveShotId(null)}
                  />
                )}
              </div>
              <div className="flex justify-between items-start gap-4 px-2 md:px-4">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-serif italic text-white group-hover:text-purple-400 transition-colors">{shot.title}</h4>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md font-light">{shot.description}</p>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-purple-400/30 font-bold bg-white/5 px-2 py-1 rounded">
                  {projectId.substring(0,2).toUpperCase()}_{String(shot.id).padStart(3, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Sheet */}
      <section className="py-20 md:py-32 border-t border-purple-500/10 bg-purple-950/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-3 gap-16 md:gap-24">
          <div className="col-span-1">
            <h3 className="text-2xl md:text-3xl font-serif italic mb-6 md:mb-8">Technical Mandate</h3>
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
              {data.technicalDescription}
            </p>
          </div>
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-purple-400 mb-4 md:mb-6">Software Finish</p>
              <ul className="text-sm md:text-base text-slate-300 space-y-2 md:space-y-3 font-medium">
                <li>DaVinci Resolve Studio</li>
                <li>Hedge Offload Pro</li>
                <li>Autodesk Flame Assist</li>
              </ul>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-purple-400 mb-4 md:mb-6">Archive Standards</p>
              <ul className="text-sm md:text-base text-slate-300 space-y-2 md:space-y-3 font-medium">
                <li>ProRes 4444 XQ Master</li>
                <li>IMF App 2E</li>
                <li>LTO-8 Cold Storage</li>
              </ul>
            </div>
            <div className="flex flex-col sm:justify-end items-start sm:items-end gap-4 md:gap-6">
               <button 
                onClick={handleShare}
                className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all group px-4 py-2 hover:bg-white/5 rounded-lg"
               >
                  <Share2 className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-125 transition-transform" /> Sync Link
               </button>
               <button className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all group px-4 py-2 hover:bg-white/5 rounded-lg">
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-125 transition-transform" /> Director's Cut
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="py-16 md:py-24 border-t border-purple-500/10 flex justify-center bg-[#030014] px-6">
        <button 
          onClick={onBack}
          className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-purple-600 hover:text-white transition-all shadow-glow shadow-glow-hover transform active:scale-95 flex items-center justify-center gap-3"
        >
          Return to Catalog <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;