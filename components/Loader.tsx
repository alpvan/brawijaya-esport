import React, { useEffect, useState } from 'react';
const logoImg = './Logo.png';

const Loader: React.FC = () => {
  const [startExit, setStartExit] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.5s
    const timer = setTimeout(() => {
      setStartExit(true);
      // Trigger flash slightly before the zoom finishes for smooth transition
      setTimeout(() => setShowFlash(true), 400);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden
          ${startExit ? 'animate-zoom-exit' : ''}`}
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="flex flex-col items-center">
          {/* Animated Logo Container */}
          <div className="relative mb-8">
            {/* Spinning Rings */}
            <div className="absolute inset-[-40%] rounded-full border border-primary/20 animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-[-20%] rounded-full border border-dashed border-amber-500/20 animate-[spin_4s_linear_infinite_reverse]"></div>

            {/* Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>

            {/* 2D Logo with Glitch/Shake Effect */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 animate-glitch-shake">
              <img
                src={logoImg}
                alt="Loading"
                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]"
              />

              {/* Glitch Overlay */}
              <img src={logoImg} alt="" className="absolute inset-0 w-full h-full object-contain opacity-50 animate-glitch-red mix-blend-screen" aria-hidden="true" />
              <img src={logoImg} alt="" className="absolute inset-0 w-full h-full object-contain opacity-50 animate-glitch-blue mix-blend-screen" aria-hidden="true" />
            </div>
          </div>

          {/* Text */}
          <h1 className="text-xl md:text-2xl font-sans font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-amber-500 animate-pulse mt-4">
            BRAWIJAYA ESPORT
          </h1>
        </div>

        {/* CRT Overlay Effects (Scanlines - Optional, keeping for style) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

        <style>{`
          @keyframes zoom-exit {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(30); opacity: 0; pointer-events: none; visibility: hidden; }
          }
          .animate-zoom-exit {
            animation: zoom-exit 0.8s cubic-bezier(0.7, 0, 0.3, 1);
          }
          
          /* Subtle Glitch Animations */
          @keyframes glitch-shake {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
           @keyframes glitch-red {
            0% { transform: translate(0); opacity: 0; }
            20% { transform: translate(-3px, 0); opacity: 0.5; }
            40% { transform: translate(0); opacity: 0; }
            100% { opacity: 0; }
          }
          @keyframes glitch-blue {
            0% { transform: translate(0); opacity: 0; }
            60% { transform: translate(3px, 0); opacity: 0.5; }
            80% { transform: translate(0); opacity: 0; }
            100% { opacity: 0; }
          }
          
          .animate-glitch-shake { animation: glitch-shake 3s infinite; }
          .animate-glitch-red { animation: glitch-red 3s infinite; }
          .animate-glitch-blue { animation: glitch-blue 3s infinite; }
        `}</style>
      </div>

      {/* Website Entrance Flash */}
      {showFlash && (
        <div
          className="fixed inset-0 z-[9998] bg-white pointer-events-none animate-entrance-flash mix-blend-overlay"
        />
      )}
      <style>{`
        @keyframes entrance-flash {
          0% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-entrance-flash {
          animation: entrance-flash 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Loader;