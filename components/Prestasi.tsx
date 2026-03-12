import React, { useRef, useState, useEffect } from 'react';
import Reveal from './Reveal';
import ParallaxSection from './ParallaxSection';
import GlitchReveal from './GlitchReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrestasiStore } from '../src/store/usePrestasiStore';

const Prestasi: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const { prestasiList, fetchPrestasi } = usePrestasiStore();

    useEffect(() => {
        fetchPrestasi();
    }, [fetchPrestasi]);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        updateWidth();

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [prestasiList]);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeftStart = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (carouselRef.current) {
            startX.current = e.pageX - carouselRef.current.offsetLeft;
            scrollLeftStart.current = carouselRef.current.scrollLeft;
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (carouselRef.current) {
            const x = e.pageX - carouselRef.current.offsetLeft;
            const walk = (x - startX.current) * 1.5; // Drag speed multiplier
            carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
        }
    };

    return (
        <ParallaxSection
            id="prestasi"
            className="py-16 md:py-24 lg:py-32"
            backgroundContent={
                <>
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite 0.5s' }}></div>
                </>
            }
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
                        <div>
                            <GlitchReveal>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
                                    <span className="text-primary font-sans text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
                                        Prestasi
                                    </span>
                                </div>
                            </GlitchReveal>

                            <GlitchReveal>
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                                        Pencapaian
                                    </span>
                                </h3>
                            </GlitchReveal>
                        </div>

                        {/* Navigation Arrows - Hidden on very small screens to encourage swiping */}
                        <div className="hidden lg:flex gap-3 md:gap-4">
                            <button
                                onClick={scrollLeft}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all shrink-0"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all shrink-0"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                    </div>
                </Reveal>

                <div className="overflow-hidden relative -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div
                        ref={carouselRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className={`flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-8 px-1 ${!isDragging ? 'snap-x snap-mandatory' : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
                    >
                        {prestasiList.map((img, index) => (
                            <div
                                key={index}
                                className="shrink-0 w-[260px] sm:w-[300px] md:w-[320px] h-[350px] sm:h-[400px] relative rounded-2xl overflow-hidden group border border-white/10 snap-center select-none"
                            >
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-2 sm:px-3 py-1 mb-2 rounded-md sm:rounded-lg bg-primary/20 text-primary text-[9px] sm:text-[10px] font-bold border border-primary/30 backdrop-blur-sm">
                                        {img.desc}
                                    </span>
                                    <h4 className="text-white font-sans font-bold text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                                        {img.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
};

export default Prestasi;
