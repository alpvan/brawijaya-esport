import React from 'react';
import Reveal from './Reveal';

const TeamLogos: React.FC = () => {
  const teams = [
    { name: 'Mobile Legends', id: 'MLBB' },
    { name: 'PUBG Mobile', id: 'PUBGM' },
    { name: 'Valorant', id: 'VAL' },
    { name: 'Dota 2', id: 'DOTA2' },
    { name: 'Free Fire', id: 'FF' },
    { name: 'E-Football', id: 'PES' },
  ];

  return (
    <section className="py-8 sm:py-12 bg-transparent border-y border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <Reveal>
          <h3 className="text-gray-500 font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-8 text-center text-nowrap">
            Official Game Divisions
          </h3>
        </Reveal>

        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex justify-start md:justify-center items-center gap-4 sm:gap-8 md:gap-12 min-w-max px-4 md:px-0">
            {teams.map((team, index) => (
              <Reveal key={index} delay={index * 50} direction="up">
                <div
                  className="group flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 hover:-translate-y-2 w-20 sm:w-24 shrink-0"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-surface-dark-2 border border-gray-800 flex items-center justify-center p-3 sm:p-4 group-hover:border-primary group-hover:shadow-glow transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={`https://placehold.co/150x150/1A1A1A/FFD700?text=${team.id}&font=orbitron`}
                      alt={`${team.name} Logo`}
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 rounded-xl"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-sans font-bold text-gray-500 group-hover:text-primary transition-colors tracking-wide text-center leading-tight">
                    {team.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamLogos;