import React, { useRef, useEffect, useState } from 'react';

const GameDivisions: React.FC = () => {
    const games = [
        {
            title: "Mobile Legends",
            desc: "MOBA mobile 5v5 kompetitif dengan rotasi tim dan strategi makro tingkat tinggi.",
            image: "./mlbb.png"
        },
        {
            title: "Honor of Kings",
            desc: "MOBA global yang menguji mekanik individu dan kerjasama tim dalam pertempuran epik.",
            image: "./hok.png"
        },
        {
            title: "Valorant",
            desc: "Tactical FPS yang memadukan aim tajam dan penggunaan ability agen secara strategis.",
            image: "./valorant.png"
        },
        {
            title: "E-Football",
            desc: "Simulasi sepak bola realistis yang menuntut pemahaman taktik dan skill formasi.",
            image: "./efootball.png"
        }
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationId: number;

        // Initialize to middle to allow Left-to-Right scrolling
        if (container.scrollLeft === 0) {
            container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        }

        let scrollPos = container.scrollLeft;
        const speed = 1;

        const scroll = () => {
            if (!isPaused && !isDragging) {
                scrollPos -= speed;
                if (scrollPos <= 0) {
                    scrollPos = (container.scrollWidth - container.clientWidth) / 2;
                }
                container.scrollLeft = scrollPos;
            } else if (!isDragging) {
                scrollPos = container.scrollLeft;
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const container = scrollContainerRef.current;
        if (container) {
            startX.current = e.pageX - container.offsetLeft;
            startScrollLeft.current = container.scrollLeft;
        }
        if (cursorRef.current) {
            cursorRef.current.style.top = `${e.clientY}px`;
            cursorRef.current.style.left = `${e.clientX}px`;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (cursorRef.current) {
            cursorRef.current.style.top = `${e.clientY}px`;
            cursorRef.current.style.left = `${e.clientX}px`;
        }

        if (!isDragging) return;
        e.preventDefault();
        const container = scrollContainerRef.current;
        if (container) {
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX.current) * 1;
            container.scrollLeft = startScrollLeft.current - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    return (
        <div className="relative w-full">
            {/* Swipeable Marquee Container */}
            <div
                ref={scrollContainerRef}
                className={`relative w-full overflow-x-auto scrollbar-hide py-10 cursor-none select-none ${isPaused && !isDragging ? 'snap-x snap-mandatory' : ''}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <div className="flex gap-6 w-max px-4">
                    {[...games, ...games, ...games, ...games, ...games].map((game, index) => (
                        <div key={index} className="snap-center w-[280px] md:w-[350px] flex-shrink-0 group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-primary/50 hover:from-primary/10 hover:to-amber-500/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,215,0,0.1)] backdrop-blur-sm relative overflow-hidden select-none">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-amber-500/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300 p-2">
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
                                />
                            </div>

                            <h4 className="relative text-xl font-sans font-bold mb-3 text-white group-hover:text-primary transition-colors">
                                {game.title}
                            </h4>
                            <p className="relative text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                {game.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Logo Cursor Follower */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen transition-opacity duration-200 ease-out ${isPaused ? 'opacity-100' : 'opacity-0'} ${isDragging ? 'scale-75' : 'scale-100'}`}
                style={{
                    width: '64px',
                    height: '64px',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className={`absolute inset-0 border-2 border-primary/50 rounded-full ${isDragging ? 'animate-[spin_0.5s_linear_infinite]' : 'animate-[spin_3s_linear_infinite]'}`}></div>
                    <div className="absolute inset-2 bg-primary/20 blur-md rounded-full"></div>
                    <img src="./Logo.png" alt="Cursor" className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,1)]" />
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default GameDivisions;
