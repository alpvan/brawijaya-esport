import React from 'react';
import Logo from './Logo';
import { Instagram, MapPin } from 'lucide-react';

const TikTokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Profile', href: '#about' },
    { name: 'Prestasi', href: '#prestasi' },
    { name: 'Acara', href: '#events' },
    { name: 'Kerja Sama', href: '#contact' },
  ];

  return (
    <footer className="relative z-20 bg-black border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-auto" />
              <div>
                <h3 className="font-sans font-bold text-white text-lg">BRAWIJAYA ESPORT</h3>
                <p className="text-gray-500 text-xs">UKM Universitas Brawijaya</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Komunitas e-sport mahasiswa yang mengembangkan talenta dan prestasi di tingkat nasional.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4">Link Kembali</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4">Media Sosial</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Instagram className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <a href="https://www.instagram.com/brawijaya_esports/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @brawijaya_esports
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <TikTokIcon />
                <a href="https://www.tiktok.com/@brawijayaesports" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @brawijayaesports
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <span className="text-lg group-hover:scale-125 transition-transform">😏</span>
                <a href="https://www.instagram.com/itsfrrel/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  @itsfrrel

                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4">Lokasi</h4>
            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4192876864646!2d112.61307847500944!3d-7.952093392061695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882731cc6e26b%3A0x45bf172ae6ecc800!2sUniversitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1703849562345!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-300"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2025 Alvan. Hak cipta dilindungi.
            </p>
            <p className="text-gray-600 text-xs">
              Dibuat dengan ❤️ untuk BEST UB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;