import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Zap,
  ExternalLink,
  Quote,
  Sun,
  Moon
} from 'lucide-react';

import SITE_DATA from './siteData';
import { SectionTitle } from './components/SectionTitle';
import { MarqueeDivider } from './components/MarqueeDivider';

export default function App() {
  // Initialize state based on system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = (): void => setIsDark(!isDark);

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Define colors based on theme
  // Dark Mode is now "Blue Mode" (Blue Background / White Text)
  const colors = {
    bg: isDark ? '#0000ff' : '#ffffff',
    text: isDark ? '#ffffff' : '#0000ff',
    accent: '#deff00',
    navText: isDark ? '#ffffff' : '#0000ff',
    border: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,255,0.1)',
  };

  return (
    <div 
      className="min-h-screen font-body selection:bg-[#deff00] selection:text-black overflow-x-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      
      {/* Custom Styles Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@700&display=swap');
        
        :root {
          --font-display: 'Archivo Black', sans-serif;
          --font-body: 'Space Grotesk', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }
        .font-mono { font-family: var(--font-mono); }

        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? '#deff00' : '#0000ff'}; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section 
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20"
      >
        
        <nav className="absolute top-10 right-10 flex items-center gap-6 md:gap-10 z-20 flex-wrap justify-end">
            <div className="flex gap-4 md:gap-8">
              {SITE_DATA.navigation.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => scrollTo(item.id)}
                    className="text-[10px] uppercase tracking-[0.3em] font-black hover:opacity-50 transition-all"
                    style={{ color: colors.navText }}
                  >
                    {item.name}
                  </button>
              ))}
            </div>
            
            {/* Theme Switcher Slide Toggle */}
            <button 
              onClick={toggleTheme}
              className="relative w-16 h-8 rounded-full border-2 transition-all duration-300 flex items-center px-1"
              title="Toggle Theme"
              style={{ 
                borderColor: colors.text,
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300"
                style={{
                  backgroundColor: colors.text,
                  color: colors.bg,
                  transform: isDark ? 'translateX(32px)' : 'translateX(0)'
                }}
              >
                {isDark ? <Sun size={12} /> : <Moon size={12} />}
              </div>
            </button>
        </nav>

        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          <div className="mb-12">
            <span 
              className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-6 opacity-80 flex items-center gap-2"
              style={{ color: colors.text }}
            >
              <Zap size={12} fill={colors.text} /> {SITE_DATA.profile.title}
            </span>
            <h1 className="text-[16vw] sm:text-[14vw] lg:text-[13rem] leading-[0.75] tracking-tighter font-display uppercase flex flex-col items-start">
              {/* First Name solid, Last Name outlined */}
              <span 
                className="block transition-all duration-300 cursor-default"
                style={{ color: colors.text }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  (e.currentTarget.style as any).webkitTextStroke = `3px ${isDark? colors.accent: colors.text}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.text;
                  (e.currentTarget.style as any).webkitTextStroke = `1px ${colors.text}`;
                }}
              >
                {SITE_DATA.profile.firstName}
              </span>
              <span 
                className="block text-transparent transition-all duration-300 cursor-default" 
                style={{ 
                  WebkitTextStroke: `1px ${colors.text}`
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style as any).webkitTextStroke = `3px ${isDark? colors.accent: colors.text}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style as any).webkitTextStroke = `1px ${colors.text}`;
                }}
              >
                {SITE_DATA.profile.lastName}
              </span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <p 
                className="text-2xl md:text-4xl font-medium leading-[1.1] max-w-3xl border-l-[12px] pl-6 md:pl-10 py-4 tracking-tight"
                style={{ borderLeftColor: colors.accent }}
              >
                {SITE_DATA.profile.tagline}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
                <button 
                  onClick={() => scrollTo('pivot')}
                  className="group relative flex items-center gap-4 text-black px-10 py-6 font-black uppercase tracking-widest text-sm transition-all shadow-2xl hover:scale-105 active:scale-95"
                  style={{ backgroundColor: colors.accent }}
                >
                  EXPLORE
                  <ArrowUpRight size={20} />
                </button>
            </div>
          </div>
        </div>
      </section>

      <MarqueeDivider isDark={isDark} text={`Current Role: ${SITE_DATA.currentPursuit.role} @ ${SITE_DATA.currentPursuit.company}`} />

      {/* --- CAREER EVOLUTION --- */}
      <section 
        id="pivot" 
        className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="max-w-[1440px] mx-auto">
          <SectionTitle isDark={isDark} outline="CAREER" solid="EVOLUTION" />
          
          <div className="relative mt-20">
            <div 
              className="absolute left-4 md:left-8 top-0 h-full w-[2px] z-0"
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,255,0.2)' }}
            ></div>

            <div className="relative flex flex-col gap-16">
              {SITE_DATA.pivot.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex flex-col items-start justify-center">
                    <div className="w-full z-10 transition-all duration-500 hover:-translate-y-2 pl-16 md:pl-24 py-4">
                        <div 
                          className="p-6 md:p-8 border-2 transition-all rounded-sm shadow-sm relative group overflow-hidden"
                          style={{ 
                            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,255,0.02)',
                            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,255,0.1)'
                          }}
                        >
                            <span className="font-mono text-[10px] font-bold mb-2 uppercase tracking-[0.4em] block" style={{ color: colors.text }}>
                              {step.phase} // {step.subtitle}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 font-display uppercase leading-none" style={{ color: colors.text }}>
                              {step.title}
                            </h3>
                            <p 
                              className="text-base font-normal leading-relaxed max-w-2xl"
                              style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)' }}
                            >
                                {step.description}
                            </p>
                        </div>
                    </div>

                    <div className="absolute left-4 md:left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                          style={{ 
                            backgroundColor: colors.bg, 
                            borderWidth: '4px',
                            borderColor: colors.accent 
                          }}
                        >
                            <Icon size={24} style={{ color: colors.text }} />
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>    

       {/* --- MEDIA CLIPS SECTION --- */}
      <section 
        id="clips" 
        className="py-16 md:py-24 px-6 md:px-12 transition-colors duration-500"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="max-w-[1440px] mx-auto">
          <SectionTitle isDark={isDark} outline="MEDIA" solid="CLIPS" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {SITE_DATA.clips.map((clip, idx) => (
              <a 
                key={idx} 
                href={clip.url} 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col p-8 border-2 transition-all duration-500 shadow-sm hover:shadow-2xl relative"
                style={{ 
                  backgroundColor: colors.bg,
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,255,0.1)'
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2" style={{ backgroundColor: colors.accent }}>
                    <Quote size={16} fill="black" stroke="black" />
                  </div>
                  <ExternalLink size={18} className="transition-all hover:scale-110" style={{ color: colors.text }} />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block" style={{ color: colors.text }}>
                  {clip.source}
                </span>
                <h3 
                  className="text-xl font-black font-display uppercase leading-tight mb-6 transition-colors group-hover:text-[#deff00]"
                  style={{ color: colors.text }}
                >
                  {clip.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed font-normal mb-8"
                  style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}
                >
                  {clip.snippet}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
                    {clip.tags?.map(tag => (
                        <span key={tag} className="text-[9px] font-mono uppercase tracking-widest font-bold" style={{ color: colors.text }}>
                            #{tag}
                        </span>
                    ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: colors.bg }}>
        
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <h2 className="text-[15vw] md:text-[14rem] leading-[0.7] tracking-tighter mb-16 font-display uppercase">
            <span className="block" style={{ color: colors.text }}>GET IN</span>
            <span 
              className="block text-transparent" 
              style={{ WebkitTextStroke: `1.2px ${colors.text}` } as any}
            >
              TOUCH
            </span>
          </h2>
          <a 
            href={`mailto:${SITE_DATA.profile.email}`} 
            className="text-2xl md:text-5xl font-extralight tracking-tighter underline underline-offset-[16px] md:underline-offset-[24px] decoration-4 transition-all font-display break-all"
            style={{ 
              color: colors.text,
              textDecorationColor: colors.accent
            }}
          >
            {SITE_DATA.profile.email}
          </a>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-24">
              {[
                { label: 'LinkedIn', url: SITE_DATA.profile.socials.linkedin },
                { label: 'GitHub', url: SITE_DATA.profile.socials.github },
                { label: 'Blue Sky', url: SITE_DATA.profile.socials.bluesky },
                { label: 'Instagram', url: SITE_DATA.profile.socials.instagram }
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex items-center px-6 py-3 text-xs font-bold transition-all duration-300 uppercase tracking-[0.3em] hover:bg-[#deff00] hover:!text-black hover:-translate-y-1 hover:shadow-lg active:scale-95"
                  style={{ color: colors.text }}
                >
                  <span>{link.label}</span>
                </a>
              ))}
          </div>
        </div>
      </section>

     {/* --- MINIMAL FOOTER --- */}
      <footer 
        className="py-16 border-t-2 px-6 md:px-12 relative transition-colors duration-500"
        style={{ 
          backgroundColor: colors.bg,
          borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' 
        }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60" style={{ color: colors.text }}>
            © 2026 {SITE_DATA.profile.name}
          </p>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="text-[10px] font-black transition-colors uppercase tracking-[0.3em] hover:opacity-50"
            style={{ color: colors.text }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>

    </div>
  );
}