import React from 'react';
const logoImg = './Logo.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 opacity-0 blur-xl group-hover:opacity-60 transition-all duration-500" />

      {/* Rotating ring on hover */}
      <div className="absolute -inset-1 rounded-full border border-transparent group-hover:border-yellow-500/50 group-hover:animate-spin transition-all duration-300"
        style={{ animationDuration: '3s' }} />

      {/* Logo image */}
      <img
        src={logoImg}
        alt="Brawijaya Esport Logo"
        className="relative object-contain w-full h-full 
                   transition-all duration-300 
                   group-hover:scale-110 
                   group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]
                   group-hover:brightness-110"
      />
    </div>
  );
};

export default Logo;