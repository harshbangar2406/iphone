
import React, { useState } from 'react';
import { Wand2, Sparkles, RefreshCcw, Copy, Check } from 'lucide-react';
import { enhanceDescription } from '../services/gemini';

const AIPolisher: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEnhance = async () => {
    if (!input.trim()) return;
    setIsEnhancing(true);
    try {
      const result = await enhanceDescription(input);
      setOutput(result);
    } catch (err) {
      console.error(err);
      setOutput("Internal error connecting to Gemini. Please verify your connection.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/40 p-12 rounded-[3rem] border border-purple-500/10 max-w-5xl mx-auto backdrop-blur-xl relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-purple-500/30">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] -mr-48 -mt-48 pointer-events-none group-hover:opacity-100 transition-opacity opacity-50"></div>
      
      <div className="flex items-center gap-6 mb-12 relative z-10">
        <div className="bg-purple-600/20 p-5 rounded-2xl border border-purple-500/20 shadow-glow">
          <Wand2 className="w-10 h-10 text-purple-400" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white font-serif italic">Description Engine</h3>
          <p className="text-purple-400/60 text-[10px] uppercase tracking-[0.4em] font-black">AI Orchestration Module</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-2">
            Input Creative Directives
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your scene in plain words... (e.g. moody rain at night, neon lights, fast cuts)"
            className="w-full h-56 bg-black/60 border border-purple-500/10 rounded-3xl p-8 text-slate-300 focus:outline-none focus:border-purple-500 transition-all resize-none placeholder:text-slate-800 text-lg font-light leading-relaxed"
          />
          <button
            onClick={handleEnhance}
            disabled={isEnhancing || !input.trim()}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] text-xs py-6 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-glow"
          >
            {isEnhancing ? (
              <>
                <RefreshCcw className="w-5 h-5 animate-spin" />
                Processing Tensors...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Synthesize Narrative
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center ml-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Enhanced Output
            </label>
            {output && (
              <button 
                onClick={copyToClipboard}
                className="text-purple-400 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase font-black tracking-widest"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Captured' : 'Transfer to Clipboard'}
              </button>
            )}
          </div>
          <div className="w-full h-56 bg-purple-500/5 border border-purple-500/20 rounded-3xl p-8 text-purple-100 italic font-light text-xl relative flex items-center justify-center overflow-y-auto leading-relaxed shadow-inner">
            {output ? (
              <p className="animate-reveal">"{output}"</p>
            ) : (
              <p className="text-slate-700 text-sm text-center font-mono">Standby for synthesis... Your creative brief will be re-engineered here.</p>
            )}
          </div>
          <p className="text-[9px] text-slate-600 text-center uppercase tracking-[0.2em] font-black">
            LVM Processing via Gemini 3 Flash Inference
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIPolisher;