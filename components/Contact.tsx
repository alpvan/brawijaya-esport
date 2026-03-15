import React from 'react';
import Reveal from './Reveal';
import { MessageCircle, Heart, X } from 'lucide-react';
import GlitchReveal from './GlitchReveal';
import ParallaxSection from './ParallaxSection';

interface ContactProps {
  onOpenSupport: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenSupport }) => {
  return (
    <ParallaxSection
      id="contact"
      className="py-16 md:py-24 lg:py-32"
      backgroundContent={
        <>
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1.5s' }}></div>
        </>
      }
    >
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <Reveal className="w-full">
          <div className="flex flex-col items-center">
            <GlitchReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary font-sans text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
                  Kerja Sama
                </span>
              </div>
            </GlitchReveal>

            <GlitchReveal>
              <h3 className="text-3xl md:text-5xl font-sans font-black mb-6 leading-tight">
                <span className="text-white">Tertarik Menjalin </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                  Kerjasama?
                </span>
              </h3>
            </GlitchReveal>

            <p className="text-gray-400 mb-8 font-medium italic">
              Kami terbuka untuk berbagai peluang kolaborasi, sponsorship, dan kemitraan strategis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <div className="relative group">
                <a
                  href="https://wa.me/6285706094282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-sans text-sm font-bold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Diskusikan Kerja Sama
                </a>

                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/50">
                  Chat dengan Narahubung Kami
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-primary/50"></div>
                </div>
              </div>

              <div className="relative group">
                <button
                  onClick={onOpenSupport}
                  className="inline-flex flex-1 items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-xl border-2 border-primary/50 text-primary bg-black/20 backdrop-blur-sm font-sans text-sm font-bold uppercase tracking-wider hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                  Support Developer
                </button>

                <div className="absolute -top-14 left-1/2 -translate-x-1/2 min-w-[250px]
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                bg-black border border-primary/30 text-white text-xs text-center
                                py-2 px-3 rounded-lg shadow-glow transition-all duration-300 z-50 pointer-events-none">
                  Untuk mendukung pengembangan website ini
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-primary/30 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </ParallaxSection>
  );
};

export default Contact;