import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Trophy, Clock, MapPin, Briefcase, Star, Zap, Gift } from 'lucide-react';
import { EventItem, DetailCard } from '../src/store/useEventsStore';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  clock: Clock,
  users: Users,
  trophy: Trophy,
  mappin: MapPin,
  briefcase: Briefcase,
  star: Star,
  zap: Zap,
  gift: Gift,
  calendar: Calendar,
};

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onRegister: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event, onRegister }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Hide navbar when modal opens
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      if (navbar) {
        navbar.style.transform = 'translateX(-50%) translateY(-150%)';
        navbar.style.opacity = '0';
      }
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      if (navbar) {
        navbar.style.transform = 'translateX(-50%) translateY(0)';
        navbar.style.opacity = '1';
      }
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;
  if (!event) return null;

  const cards = event.detailCards || [];

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl bg-surface-dark border border-primary/30 shadow-[0_0_50px_rgba(255,215,0,0.1)] transform transition-all duration-300 flex flex-col max-h-[90vh] ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="mb-6 border-b border-gray-800 pb-6">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Detail Acara</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white leading-tight mb-4">{event.title}</h2>
            <div className="flex flex-wrap items-center text-gray-400 text-sm gap-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {event.date} {event.month}</span>
              {event.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</span>}
              {event.time && <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {event.time}</span>}
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <h4 className="text-white font-sans font-bold text-lg mb-2">Deskripsi</h4>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {event.content || event.desc}
            </p>
          </div>

          {cards.length > 0 && (
            <div className={`grid grid-cols-1 ${cards.length === 1 ? '' : cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 mb-8`}>
              {cards.map((card) => {
                const IconComp = iconMap[card.icon] || Star;
                return (
                  <div key={card.id} className="bg-surface-dark-2 p-4 border border-gray-800 rounded-sm hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <IconComp className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">{card.label}</span>
                    </div>
                    <p className="text-sm text-white font-medium">{card.value}</p>
                  </div>
                );
              })}
            </div>
          )}

          {(event.btn === 'Daftar' || event.btn === 'Info') && event.active && (
            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={onRegister}
                className="w-full bg-primary text-black font-sans font-bold text-lg py-4 hover:bg-white hover:shadow-glow transition-all duration-300 clip-polygon uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {event.btn === 'Daftar' ? 'Daftar Sekarang' : 'Informasi Lebih Lanjut'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;