import React, { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import TextScramble from './TextScramble';
import GlitchReveal from './GlitchReveal';
import CountUp from './CountUp';
import { ChevronDown, Info, Calendar, Trophy, Users } from 'lucide-react';
import Logo3D from './Logo3D';
import { useContentStore } from '../src/store/useContentStore';

const Hero: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgShape1Ref = useRef<HTMLDivElement>(null);
  const bgShape2Ref = useRef<HTMLDivElement>(null);
  const floatingShapeRef = useRef<HTMLDivElement>(null);

  const { hero, fetchContent } = useContentStore();

  useEffect(() => {
    // Fetch content on mount
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;

          // Only animate background shapes - these are GPU accelerated
          if (bgShape1Ref.current) {
            bgShape1Ref.current.style.transform = `translate3d(0, ${scrolled * 0.08}px, 0)`;
          }

          if (bgShape2Ref.current) {
            bgShape2Ref.current.style.transform = `translate3d(0, ${scrolled * 0.12}px, 0)`;
          }

          // Reduced parallax on content for less jank
          if (textRef.current) {
            textRef.current.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
          }

          if (logoRef.current) {
            logoRef.current.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
          }

          // Floating shape parallax
          if (floatingShapeRef.current) {
            floatingShapeRef.current.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) rotate(45deg)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Trophy, end: 50, suffix: '+', label: 'Prestasi' },
    { icon: Users, end: 800, suffix: '+', label: 'Anggota' },
    { icon: Calendar, end: 20, suffix: '+', label: 'Acara/Tahun' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-40">



      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none z-0"></div>

      {/* Parallax Glow Elements */}
      <div
        ref={bgShape1Ref}
        className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0 will-change-transform"
      ></div>

      <div
        ref={bgShape2Ref}
        className="absolute top-[50%] right-[5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0 will-change-transform"
      ></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Text Section */}
          <div ref={textRef} className="text-left order-2 lg:order-1 will-change-transform relative z-20">
            <Reveal>
              {/* Badge */}
              <GlitchReveal delay={500}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30 backdrop-blur-sm">
                  <span className="text-primary font-sans text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
                    Brawijaya Esport
                  </span>
                </div>
              </GlitchReveal>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight mb-6 md:mb-8 leading-none">
                <GlitchReveal delay={800}>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <GlitchReveal delay={800}>
                      <span className="text-white drop-shadow-xl filter">
                        <TextScramble text={hero?.titleText1 || "BRAWIJAYA"} delay={1000} />
                      </span>
                    </GlitchReveal>
                    <GlitchReveal delay={1000}>
                      <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400 drop-shadow-[0_0_35px_rgba(255,215,0,0.4)]">
                        <TextScramble text={hero?.titleText2 || "ESPORT"} delay={1500} />
                        {/* Glitch overlay elements */}
                        <span className="absolute top-0 left-0 -ml-1 text-primary/30 opacity-0 animate-ping pointer-events-none">{hero?.titleText2 || "ESPORT"}</span>
                      </span>
                    </GlitchReveal>
                  </div>
                </GlitchReveal>
              </h1>

              {/* Description */}
              <p className="mt-6 md:mt-8 max-w-2xl text-sm md:text-lg text-gray-400 leading-relaxed">
                {hero?.description || "Unit Kegiatan Mahasiswa (UKM) Brawijaya Esport adalah komunitas e-sports di Universitas Brawijaya. Sejak 2021, kami mewadahi 800+ anggota dan membina tim kompetitif (MLBB, HOK, PUBGM, Valorant) untuk berprestasi di tingkat nasional dengan menjunjung tinggi sportivitas."}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 md:mt-10 flex flex-col w-full sm:flex-row sm:w-auto gap-4">
                <a
                  href="#about"
                  className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-primary to-yellow-400 text-black font-sans font-bold text-sm md:text-base rounded-xl
                           hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:scale-105
                           transition-all duration-300 text-center flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Info className="w-4 h-4" />
                  TENTANG KAMI
                </a>
                <a
                  href="#events"
                  className="px-6 md:px-8 py-3.5 md:py-4 bg-white/5 border border-white/20 text-white font-sans font-bold text-sm md:text-base rounded-xl
                           hover:bg-white/10 hover:border-primary/50 hover:text-primary
                           transition-all duration-300 text-center flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4" />
                  DAFTAR
                </a>
              </div>

              {/* Stats */}
              <div className="mt-10 md:mt-12">
                <div className="grid grid-cols-3 gap-2 sm:gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1 md:gap-2 mb-1">
                        <stat.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <span className="text-xl sm:text-2xl md:text-3xl font-sans font-black text-white">
                          <CountUp end={stat.end} suffix={stat.suffix} />
                        </span>
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest block whitespace-nowrap overflow-hidden text-ellipsis px-1 sm:px-0">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Logo Section */}
          <div ref={logoRef} className="relative order-1 lg:order-2 flex justify-center lg:justify-end will-change-transform z-30 mb-8 lg:mb-0">
            <div className="animate-float relative group cursor-pointer scale-75 sm:scale-90 lg:scale-100">
              {/* Multiple layered glows - more intense on hover */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-[60px] md:blur-[120px] scale-[2] animate-pulse group-hover:bg-primary/50 transition-all duration-500"></div>
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-[40px] md:blur-[80px] scale-150 group-hover:bg-amber-500/40 transition-all duration-500"></div>

              {/* Decorative rings - animate on hover */}
              <div className="absolute inset-[-30px] rounded-full border border-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute inset-[-60px] rounded-full border border-dashed border-primary/10 group-hover:border-primary/30 group-hover:rotate-180 transition-all duration-1000"></div>
              <div className="absolute inset-[-90px] rounded-full border border-dotted border-primary/5 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-700"></div>

              {/* Gradient backdrop - pulse on hover */}
              <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5 group-hover:from-primary/20 group-hover:to-amber-500/20 transition-all duration-500"></div>

              {/* Sparkle effects on hover */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300 delay-150"></div>
              <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-300"></div>

              {/* Logo wrapper with sideways flip animation on hover */}
              <div className="relative z-10 group-hover:animate-[flipY_0.6s_ease-in-out] transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
                <Logo3D size="large" autoRotate={false} interactive={true} className="drop-shadow-[0_0_80px_rgba(255,215,0,0.6)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating geometric elements with parallax */}
      <div
        ref={floatingShapeRef}
        className="absolute bottom-32 left-16 w-16 h-16 border border-primary/30 bg-primary/5 backdrop-blur-sm z-40 rotate-45 hidden lg:block pointer-events-none will-change-transform"
      ></div>

      {/* Second floating shape */}
      <div className="absolute top-1/3 right-[10%] w-12 h-12 border border-amber-400/20 bg-amber-500/5 rotate-12 hidden lg:block pointer-events-none animate-pulse"></div>

      {/* Floating particles - various sizes */}
      <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-primary rounded-full animate-ping opacity-40 hidden lg:block"></div>
      <div className="absolute top-[25%] right-[8%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-50 hidden lg:block"></div>
      <div className="absolute top-[40%] left-[8%] w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping opacity-30 hidden lg:block" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-[60%] right-[25%] w-1 h-1 bg-primary rounded-full animate-pulse opacity-60 hidden lg:block" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[40%] left-[15%] w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-40 hidden lg:block" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute bottom-[25%] right-[12%] w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse opacity-50 hidden lg:block" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute top-[20%] left-[25%] w-1 h-1 bg-primary rounded-full animate-ping opacity-30 hidden lg:block" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute bottom-[60%] left-[5%] w-3 h-3 bg-yellow-500/50 rounded-full animate-pulse opacity-20 hidden lg:block"></div>
      <div className="absolute top-[50%] right-[5%] w-2 h-2 bg-primary/60 rounded-full animate-ping opacity-25 hidden lg:block" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-[35%] right-[30%] w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-40 hidden lg:block" style={{ animationDelay: '1.5s' }}></div>

      {/* Small star-like particles */}
      <div className="absolute top-[30%] left-[30%] w-0.5 h-0.5 bg-white rounded-full opacity-60 hidden lg:block animate-pulse"></div>
      <div className="absolute top-[45%] right-[35%] w-0.5 h-0.5 bg-white rounded-full opacity-50 hidden lg:block animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      <div className="absolute bottom-[50%] left-[40%] w-0.5 h-0.5 bg-white rounded-full opacity-40 hidden lg:block animate-pulse" style={{ animationDelay: '0.9s' }}></div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-50"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors">Gulir</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 group-hover:border-primary transition-colors flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 group-hover:bg-primary rounded-full animate-bounce transition-colors"></div>
        </div>
      </div>

      {/* Sponsor Space */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent border-t border-white/5 py-6 z-40 overflow-hidden group">
        <div className="flex items-center relative">
          {/* Label */}
          <div className="hidden lg:flex items-center h-full px-8 bg-black/50 backdrop-blur-xl border-r border-white/10 z-10 absolute left-0 top-0 bottom-0">
            <span className="text-xs font-sans font-bold text-gray-500 uppercase tracking-widest">didukung oleh</span>
          </div>

          {/* Scrolling Logos */}
          <div className="flex items-center gap-12 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused] pl-4 lg:pl-40">
            {/* Real Sponsors */}
            {[
              "Moonton",
              "PUBGM Indonesia",
              "RIOT Games Indonesia",
              "UniPin Indonesia",
              "Jawara PUBGM Indonesia"
            ].map((sponsor, i) => (
              <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer">
                {/* Placeholder Tech/Gaming Logos */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i % 3 === 0 ? 'bg-red-500/20' : i % 3 === 1 ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                  <div className={`w-4 h-4 rounded-sm ${i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                </div>
                <span className="text-sm font-bold font-sans tracking-wider text-gray-300 whitespace-nowrap">
                  {sponsor}
                </span>
              </div>
            ))}
            {/* Duplicate for Loop */}
            {[
              "Moonton",
              "PUBGM Indonesia",
              "RIOT Games Indonesia",
              "UniPin Indonesia",
              "Jawara PUBGM Indonesia"
            ].map((sponsor, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i % 3 === 0 ? 'bg-red-500/20' : i % 3 === 1 ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                  <div className={`w-4 h-4 rounded-sm ${i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                </div>
                <span className="text-sm font-bold font-sans tracking-wider text-gray-300 whitespace-nowrap">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
