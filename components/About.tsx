import React, { useState } from 'react';
import Reveal from './Reveal';
import CountUp from './CountUp';
import TextScramble from './TextScramble';
import { Trophy, Users, Gamepad2, Shield, Star, Palette, Type, ChevronLeft, ChevronRight, Target, Globe, RefreshCw, HeartHandshake } from 'lucide-react';
import ParallaxSection from './ParallaxSection';
import Logo3D from './Logo3D';
import { motion, AnimatePresence } from 'framer-motion';

import GlitchReveal from './GlitchReveal';

const About: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = [
    { label: 'Anggota', end: 800, suffix: '+', icon: Users },
    { label: 'Prestasi', end: 50, suffix: '+', icon: Trophy },
  ];

  const philosophies = [
    {
      title: "Perisai",
      description: "Melambangkan kekuatan, ketangguhan, dan perlindungan. Perisai juga diartikan sebagai pelindung Komunitas dan ekosistem E-Sport agar selalu sehat dan stabil.",
      zoom: { scale: 0.6, x: 0, y: 0 },
      icon: Shield
    },
    {
      title: "Huruf B, E, S, T",
      description: 'Singkatan dari "Brawijaya E-Sport". Terdapat huruf B, E, S, dan T di dalam logo yang menandakan bahwa logo tersebut milik kebanggaan Universitas Brawijaya.',
      zoom: { scale: 0.9, x: 0, y: -30 },
      icon: Type
    },
    {
      title: "Warna Emas",
      description: "Memiliki arti kejayaan, kesuksesan, optimisme, dan prestasi. Warna emas juga salah satu warna dari logo Universitas Brawijaya yang menandakan bagian integral dari kampus.",
      zoom: { scale: 0.7, x: 0, y: 0 },
      icon: Palette
    },
    {
      title: "Bintang",
      description: "Menandakan bahwa BEST memiliki harapan yang tinggi dan akan terus berkembang. Memancarkan sinar dan menjadi pusat perhatian serta penuntun bagi pecinta esports.",
      zoom: { scale: 0.6, x: 0, y: 150 },
      icon: Star
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % philosophies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + philosophies.length) % philosophies.length);
  };

  return (
    <ParallaxSection
      id="about"
      className="py-16 md:py-24 lg:py-32"
      backgroundContent={
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 pointer-events-none"></div>


          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1s' }}></div>
        </>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        <Reveal className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 md:mb-20 relative z-20">
            <GlitchReveal>
              <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-primary/20 bg-primary/5 mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary font-sans text-xs md:text-sm font-bold tracking-[0.2em] uppercase">TENTANG BEST</span>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
              </div>
            </GlitchReveal>

            <GlitchReveal>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white mb-6 md:mb-8 tracking-tight">
                Visi <span className="text-primary italic">Kami</span>
              </h3>
            </GlitchReveal>

            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              Mewujudkan pusat pembinaan e-sports yang inklusif dan berkelanjutan, tempat mahasiswa Universitas Brawijaya berkembang sebagai atlet, kreator, dan pemimpin digital yang berdaya saing nasional.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mb-12 md:mb-20 relative z-20">
            <GlitchReveal>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white mb-6 md:mb-8 tracking-tight">
                Misi <span className="text-primary italic">Kami</span>
              </h3>
            </GlitchReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-16 md:mb-24">
            {/* Misi 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col items-start gap-4 md:gap-5 group bg-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-[80px] md:rounded-bl-[100px] pointer-events-none transition-colors group-hover:bg-primary/10"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform bg-primary/10 group-hover:bg-primary/20 shrink-0">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors">Pembinaan Profesional</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Membangun lingkungan pembinaan atlet e-sports yang profesional, terstruktur, dan berkelanjutan melalui pelatihan rutin, analisis performa, dan peningkatan kualitas kompetisi internal maupun eksternal.
                </p>
              </div>
            </motion.div>

            {/* Misi 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col items-start gap-4 md:gap-5 group bg-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-[80px] md:rounded-bl-[100px] pointer-events-none transition-colors group-hover:bg-primary/10"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform bg-primary/10 group-hover:bg-primary/20 shrink-0">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors">Komunitas Inklusif</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Mengembangkan komunitas gaming yang inklusif dan kolaboratif, yang menghargai keberagaman minat, latar belakang, dan tingkat kemampuan.
                </p>
              </div>
            </motion.div>

            {/* Misi 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 flex flex-col items-start gap-4 md:gap-5 group bg-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-[80px] md:rounded-bl-[100px] pointer-events-none transition-colors group-hover:bg-primary/10"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform bg-primary/10 group-hover:bg-primary/20 shrink-0">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors">Identitas & Kontribusi</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Menguatkan identitas Brawijaya sebagai kampus pelopor pengembangan e-sports, melalui penyelenggaraan acara berskala regional, kemitraan strategis, dan kontribusi nyata bagi perkembangan e-sports Indonesia.
                </p>
              </div>
            </motion.div>

            {/* Misi 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 lg:col-start-2 flex flex-col items-start gap-4 md:gap-5 group bg-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-[80px] md:rounded-bl-[100px] pointer-events-none transition-colors group-hover:bg-primary/10"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform bg-primary/10 group-hover:bg-primary/20 shrink-0">
                <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors">Kaderisasi Berkelanjutan</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Mengembangkan sistem kaderisasi dan manajemen organisasi yang berkelanjutan, untuk memastikan regenerasi kepengurusan, peningkatan kualitas SDM, dan keberlangsungan program jangka panjang.
                </p>
              </div>
            </motion.div>

            {/* Misi 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:col-span-2 flex flex-col items-start gap-4 md:gap-5 group bg-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-[80px] md:rounded-bl-[100px] pointer-events-none transition-colors group-hover:bg-primary/10"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform bg-primary/10 group-hover:bg-primary/20 shrink-0">
                <HeartHandshake className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors">Kolaborasi Lintas Elemen</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Mendorong kolaborasi internal lintas fakultas dan komunitas kampus untuk memperluas jaringan anggota, mendorong keberagaman talenta, dan menciptakan atmosfer komunitas yang inklusif.
                </p>
              </div>
            </motion.div>
          </div>
        </Reveal>



        <Reveal direction="up" delay={200}>
          <div className="flex flex-col">

            <div className="relative" id="philosophy-section">
              <div className="relative rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-12 mb-8 md:mb-12">
                <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-amber-500/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                <div className="flex flex-col items-center text-center mb-10 md:mb-16 relative z-20">
                  <GlitchReveal>
                    <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-primary/20 bg-primary/5 mb-4 md:mb-6">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-primary font-sans text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase">IDENTITAS</span>
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
                    </div>
                  </GlitchReveal>
                  <GlitchReveal>
                    <h4 className="text-3xl sm:text-4xl md:text-6xl font-sans font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      Filosofi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Logo</span>
                    </h4>
                  </GlitchReveal>
                </div>

                <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-5xl mx-auto">

                  <div className="flex flex-col items-center justify-center relative z-10 w-full">

                    {/* Logo 3D Display Area */}
                    <div className="relative w-full aspect-square sm:aspect-video lg:aspect-[18/9] max-h-[40vh] md:max-h-[50vh] flex items-center justify-center mb-6 sm:mb-8">
                      <button
                        onClick={prevSlide}
                        className="absolute left-1 sm:left-4 md:left-24 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>

                      <div className="relative w-full h-full max-w-2xl mx-auto group flex justify-center items-center pointer-events-none">
                        <motion.div
                          animate={{
                            scale: philosophies[currentIndex].zoom.scale,
                            x: philosophies[currentIndex].zoom.x,
                            y: philosophies[currentIndex].zoom.y
                          }}
                          transition={{ type: "spring", stiffness: 60, damping: 20 }}
                          className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[600px] md:h-[600px] shrink-0 flex items-center justify-center z-10"
                        >
                          {/* Changed glow colors to be brighter and use mix-blend-screen to avoid dark/muddy artifacts */}
                          <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-[60px] md:blur-[80px] animate-pulse mix-blend-screen"></div>
                          <Logo3D size="large" className="!w-full !h-full relative z-10" />
                        </motion.div>
                      </div>

                      <button
                        onClick={nextSlide}
                        className="absolute right-4 sm:right-12 md:right-24 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>

                    {/* Philosophy Text Area */}
                    <div className="w-full max-w-3xl mx-auto text-center min-h-[140px] md:min-h-[160px] flex flex-col items-center justify-start">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentIndex}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex flex-col items-center w-full"
                        >
                          <div className="flex items-center justify-center gap-3 mb-3 md:mb-5">
                            {(() => {
                              const IconCmp = philosophies[currentIndex].icon;
                              return <IconCmp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary shrink-0" />;
                            })()}
                            <h5 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                              {philosophies[currentIndex].title}
                            </h5>
                          </div>
                          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4 md:px-8 max-w-2xl mx-auto">
                            {philosophies[currentIndex].description}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                      {philosophies.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-primary w-6 h-2 sm:w-8 sm:h-2.5'
                            : 'bg-white/20 hover:bg-white/50 w-2 h-2 sm:w-2.5 sm:h-2.5'
                            }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </Reveal>
      </div>
    </ParallaxSection>
  );
};

export default About;