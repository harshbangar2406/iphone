import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, PlayCircle, Cpu, ShieldCheck, Clock } from 'lucide-react';
import { studioAgentChat } from '../services/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AboutMeAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hey! I’m the editing assistant here at Inertix. Tell me what kind of video you’re planning and where you want to post it.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await studioAgentChat(history, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Transmission error. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-10 md:gap-12 max-w-7xl mx-auto items-stretch">
      {/* About Content */}
      <div className="lg:col-span-2 space-y-8 md:space-y-12 flex flex-col justify-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Agent Interface</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold font-serif italic mb-6 md:mb-8 tracking-tighter text-white">
            The Vision <br /> Consultant.
          </h2>
          <p className="text-slate-400 text-base md:text-xl font-light leading-relaxed mb-6 md:mb-10">
            Meet our Neural Assistant. Trained on a decade of post-production logic, it understands the nuance between a viral hit and a brand documentary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-purple-500 mb-3 md:mb-4" />
            <h4 className="text-white font-bold text-xs md:text-sm mb-1 md:mb-2">Zero Fluff</h4>
            <p className="text-[10px] md:text-xs text-slate-500">Instant answers regarding project scope and feasibility.</p>
          </div>
          <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-500 mb-3 md:mb-4" />
            <h4 className="text-white font-bold text-xs md:text-sm mb-1 md:mb-2">Rush Logic</h4>
            <p className="text-[10px] md:text-xs text-slate-500">Real-time scheduling estimates for high-stakes deadlines.</p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-3 bg-slate-900/40 rounded-[2.5rem] md:rounded-[3.5rem] border border-purple-500/20 backdrop-blur-2xl shadow-3xl flex flex-col overflow-hidden min-h-[500px] md:min-h-[600px] relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent pointer-events-none"></div>
        
        {/* Chat Header */}
        <div className="p-6 md:p-8 border-b border-purple-500/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600/20 rounded-xl md:rounded-2xl flex items-center justify-center border border-purple-500/30 relative">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#030014] animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-white font-serif italic font-bold text-lg md:text-xl">Consultation AI</h3>
              <p className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest font-black">Gemini 3 Pro // Studio Agent</p>
            </div>
          </div>
          <div className="hidden sm:flex gap-2 md:gap-3">
             <div className="px-2 py-1 md:px-3 md:py-1 bg-white/5 rounded-full border border-white/10 text-[8px] md:text-[9px] uppercase tracking-widest text-slate-400">Secure</div>
             <div className="px-2 py-1 md:px-3 md:py-1 bg-white/5 rounded-full border border-white/10 text-[8px] md:text-[9px] uppercase tracking-widest text-slate-400">Live</div>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal`}>
              <div className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 shadow-lg ${m.role === 'user' ? 'bg-purple-600/20' : 'bg-white/5'}`}>
                  {m.role === 'user' ? <User className="w-4 h-4 md:w-5 md:h-5 text-purple-300" /> : <PlayCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />}
                </div>
                <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-purple-600/20 text-purple-100 rounded-tr-none border border-purple-500/20' 
                    : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-reveal">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400 animate-spin" />
                </div>
                <div className="p-4 md:p-5 rounded-2xl md:rounded-3xl rounded-tl-none bg-white/5 border border-white/5 text-slate-500 italic text-xs flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-purple-500/50 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-purple-500/50 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-purple-500/50 rounded-full animate-bounce delay-150"></div>
                  </div>
                  Syncing...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-6 md:p-8 border-t border-purple-500/10 bg-black/40 backdrop-blur-3xl">
          <div className="relative group/input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start brief..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 md:py-5 pl-6 md:pl-8 pr-14 md:pr-16 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700 font-light text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl transition-all shadow-glow active:scale-90 flex items-center justify-center"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutMeAI;