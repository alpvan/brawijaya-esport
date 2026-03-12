import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ShoppingBag, Instagram, Heart } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenSupport?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSupport }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sections = ['about', 'prestasi', 'events', 'committee', 'contact'];
          let currentSection = '';

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section;
                break;
              }
            }
          }
          setActiveSection(currentSection);

          const philosophySection = document.getElementById('philosophy-section');
          if (philosophySection) {
            const rect = philosophySection.getBoundingClientRect();
            // Hide navbar when the top of the philosophy section reaches near the top of the viewport
            // and show it again when the bottom of the section passes the top of the viewport
            const inView = rect.top <= 100 && rect.bottom >= 100;
            setIsHidden(inView);
          } else {
            setIsHidden(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Profile', href: '#about', id: 'about' },
    { name: 'Prestasi', href: '#prestasi', id: 'prestasi' },
    { name: 'Acara', href: '#events', id: 'events' },
    { name: 'Kerja Sama', href: '#contact', id: 'contact' },
  ] as Array<{ name: string; href: string; id: string; external?: boolean }>;

  return (
    <nav
      className={`fixed left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] max-w-5xl z-50 transition-all duration-500 ${
        isMobileMenuOpen ? 'rounded-2xl' : 'rounded-full'
      } ${isHidden
        ? '-top-20 opacity-0 pointer-events-none'
        : 'top-3 opacity-100'
        } ${isScrolled
          ? 'shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-black/60 backdrop-blur-xl border border-white/10 py-0.5'
          : 'bg-black/40 backdrop-blur-lg border border-white/5 py-1'
        }`}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="px-4 md:px-5 relative">
        <div className="flex items-center justify-between h-12">
          <div
            className={`flex items-center flex-shrink-0 cursor-pointer transition-all duration-500 group ${isScrolled ? 'scale-95' : 'scale-100'
              }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <Logo className="h-9 w-auto" />
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
            </div>
            <div className="ml-2 sm:ml-3 flex flex-col">
              <span className="font-sans font-black text-sm md:text-base tracking-wide leading-tight">
                <span className="text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">BRAWIJAYA</span>
              </span>
              <span className="font-sans font-medium text-[8px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-400">ESPORT</span>
            </div>
          </div>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center space-x-0.5 bg-white/5 rounded-xl p-0.5 border border-white/5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`relative px-4 py-1.5 rounded-lg font-sans text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeSection === link.id
                    ? 'text-black bg-primary shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button (Right Side) - Hidden on mobile to prevent overcrowding */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative group">
                <button
                  onClick={onOpenSupport}
                  className="px-4 py-2.5 rounded-xl border border-primary/30 text-primary font-sans text-[11px] font-black uppercase tracking-widest hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300 flex items-center gap-2 group/btn"
                >
                  <div className="relative">
                    <Heart className="w-3.5 h-3.5 fill-current animate-pulse group-hover/btn:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full animate-ping"></div>
                  </div>
                  Support
                </button>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black border border-primary/30 text-white text-[10px] font-bold rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-glow">
                  Dukung pengembangan website ini
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black border-l border-t border-primary/30 rotate-45"></div>
                </div>
              </div>

              <a
                href="https://www.instagram.com/brawijaya_esports/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-sans text-xs font-bold uppercase tracking-wider 
                           hover:shadow-[0_0_30_rgba(255,215,0,0.5)] hover:scale-105 
                           transition-all duration-300 flex items-center gap-2"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
            </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${isMobileMenuOpen
                ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-4 py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl rounded-b-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-300 ${activeSection === link.id
                  ? 'bg-primary text-black'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSupport?.();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-primary/30 text-primary font-sans text-sm font-bold transition-all duration-300 bg-white/5 shadow-[0_0_20px_rgba(255,215,0,0.1)]"
            >
              <Heart className="w-4 h-4 animate-pulse" />
              Support Developer
            </button>
            <a
              href="https://www.instagram.com/brawijaya_esports/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-sans text-sm font-bold transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
              Follow Instagram
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;