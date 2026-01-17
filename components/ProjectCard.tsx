import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import DistortedImage from './DistortedImage';

interface ProjectCardProps {
  project: Project;
  onClick: (e: React.MouseEvent, project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={(e) => onClick(e, project)}
      className="group relative overflow-hidden bg-slate-900/20 border border-white/5 rounded-[2rem] md:rounded-[3rem] transition-all duration-1000 ease-out hover:border-purple-500/40 hover:shadow-[0_50px_100px_rgba(0,0,0,0.5)] cursor-pointer break-inside-avoid mb-8"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <DistortedImage 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-60 group-hover:opacity-100"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/40 to-transparent pointer-events-none"></div>
      
      {/* Category Label */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
         <div className="glass px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 flex items-center gap-2 md:gap-3">
           <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full animate-pulse shadow-glow"></div>
           <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.3em]">{project.category}</span>
         </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 opacity-0 md:group-hover:opacity-100 translate-x-6 md:group-hover:translate-x-0 transition-all duration-700 hidden sm:block">
         <div className="bg-white p-4 md:p-5 rounded-full text-black shadow-glow group-hover:bg-purple-600 group-hover:text-white">
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
         </div>
      </div>
      
      <div className="p-8 md:p-12 relative z-10 pointer-events-none">
        <div className="flex justify-between items-end mb-4 md:mb-6">
          <h3 className="text-xl md:text-3xl font-bold transition-colors font-serif italic tracking-tighter text-white group-hover:text-purple-300">
            {project.title}
          </h3>
          <span className="text-slate-500 font-mono text-[9px] font-black tracking-[0.4em] bg-white/5 px-2 py-1 rounded">{project.year}</span>
        </div>
        
        <p className="text-slate-400 text-sm md:text-base line-clamp-2 mb-6 group-hover:text-slate-200 transition-colors font-light leading-relaxed tracking-tight">
          {project.description}
        </p>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.tools.slice(0, 2).map(tool => (
              <span key={tool} className="text-[8px] md:text-[9px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300 uppercase font-black tracking-widest transition-all">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
    </div>
  );
};

export default ProjectCard;