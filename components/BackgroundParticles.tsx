import React, { useEffect, useState } from 'react';

const BackgroundParticles: React.FC = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static but responsive stars
    const generateStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const starCount = Math.floor((w * h) / 10000); // Responsive star count

      const newStars = Array.from({ length: starCount }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
      }));
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black dark:bg-black">
      {/* Starfield */}
      <div className="stars-container">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Mesh Gradient Core - Emphasizing gradients and aesthetic fluidity */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-yellow-400/20 filter blur-[120px] animate-blob" />
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-amber-600/20 filter blur-[140px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[10%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full bg-amber-500/15 filter blur-[140px] animate-blob animation-delay-4000" />
        <div className="absolute bottom-[5%] right-[15%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-orange-500/15 filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* Subtle Noise Texture for a Premium, Cinematic Feel (Very Lightweight) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep Vignette Overlay for focus and contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/95"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
    </div>
  );
};

export default BackgroundParticles;