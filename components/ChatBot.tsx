
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, PlayCircle } from 'lucide-react';
import { studioAgentChat } from '../services/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the Inertix Archive. I am your studio agent. How can I assist your vision today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;
    
    // Skip the initial scroll when opening to prevent sudden movement
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

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
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white p-5 rounded-full shadow-glow shadow-glow-hover transition-all duration-500 group relative"
        >
          <div className="absolute -inset-2 bg-purple-600/20 rounded-full blur animate-pulse group-hover:bg-purple-600/40"></div>
          <MessageSquare className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[400px] max-w-[90vw] h-[600px] max-h-[80vh] bg-[#030014]/90 backdrop-blur-2xl border border-purple-500/20 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-reveal">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/10 flex items-center justify-between bg-purple-950/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-serif italic font-bold">Inertix Agent</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Online / Studio</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal`}>
                <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/5 ${m.role === 'user' ? 'bg-purple-600/20' : 'bg-white/5'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-purple-300" /> : <PlayCircle className="w-4 h-4 text-purple-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-purple-600/20 text-purple-100 rounded-tr-none border border-purple-500/20' 
                      : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-reveal">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 text-slate-500 italic text-xs">
                    Synthesizing response...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 border-t border-purple-500/10 bg-black/40">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Inertix..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700 font-light"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 p-2.5 rounded-xl transition-all shadow-glow active:scale-90"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="mt-3 text-center">
              <p className="text-[8px] text-slate-700 uppercase tracking-widest font-black">Powered by Gemini 3 Pro Inference</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
