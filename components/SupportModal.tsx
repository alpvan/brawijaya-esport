import React, { useEffect } from 'react';
import { Heart, X } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Hide navbar by adding a specific class to body that we can target or hiding it directly
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'none';
      }
    } else {
      document.body.style.overflow = '';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'block';
      }
    }

    return () => {
      document.body.style.overflow = '';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 min-h-screen w-screen overflow-y-auto overflow-x-hidden">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      ></div>
      <div className="relative bg-gradient-to-b from-surface-dark-2 to-black border border-primary/30 rounded-[2rem] w-full max-w-md p-6 sm:p-8 flex flex-col items-center shadow-[0_0_50px_rgba(255,215,0,0.1)] transform transition-all duration-300 scale-100 opacity-100 m-auto z-[1000000] my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/80 transition-all duration-300 z-10 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/20 to-amber-500/10 flex items-center justify-center mb-5 sm:mb-6 border border-primary/20 shadow-glow">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 text-center font-sans tracking-wide">
          Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">Developer</span>
        </h3>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 w-full text-center">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Dukungan Anda sangat berarti untuk <strong className="text-white">pengembangan</strong> dan <strong className="text-white">pemeliharaan</strong> website Brawijaya Esport ini.<br/> <span className="text-primary mt-2 block font-medium">✨ Terima kasih! ✨</span>
          </p>
        </div>
        
        <div className="bg-white p-3 sm:p-4 rounded-3xl mb-6 sm:mb-8 shadow-[0_0_40px_rgba(255,215,0,0.2)] relative overflow-hidden group w-[240px] sm:w-[280px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
          <img 
            src="/Qris.jpg" 
            alt="QRIS Support" 
            className="w-full h-auto rounded-xl relative z-10 block"
            loading="eager"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl font-sans text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 border-primary text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
        >
          Tutup / Kembali
        </button>
      </div>
    </div>
  );
};

export default SupportModal;
