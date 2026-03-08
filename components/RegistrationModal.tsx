import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useRegistrantsStore } from '../src/store/useRegistrantsStore';
import { EventItem, FormField } from '../src/store/useEventsStore';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, event }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { addRegistrant } = useRegistrantsStore();

  // Reset form when modal opens
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (isOpen) {
      setIsAnimating(true);
      setIsSubmitted(false);
      setFormData({});
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

  if (!isOpen && !isAnimating || !event) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addRegistrant({ eventName: event.title, ...formData } as any);
      setIsSubmitted(true);
    } catch (error) {
      alert('Gagal mendaftar. Pastikan koneksi internet stabil, lalu coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const defaultFields: FormField[] = [
    { key: 'namaLengkap', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap Anda', type: 'text', required: true },
    { key: 'nim', label: 'NIM', placeholder: 'mis. 215150...', type: 'text', required: true },
    { key: 'telepon', label: 'Nomor Telepon / WA', placeholder: 'mis. 08123456789', type: 'tel', required: true },
  ];

  const formFields = (event.formFields && event.formFields.length > 0) ? event.formFields : defaultFields;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-lg bg-zinc-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} rounded-3xl overflow-hidden`}>
        {/* Detail Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 p-2 hover:bg-white/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 overflow-y-auto max-h-[85vh] custom-scrollbar">
          {!isSubmitted ? (
            <>
              <div className="mb-10 text-center">
                <span className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-2 block">Registration Form</span>
                <h2 className="text-3xl font-sans font-black text-white leading-tight">
                  {event.title}
                </h2>
                <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black block ml-1">
                      {field.label}
                      {!field.required && <span className="ml-2 text-gray-700 normal-case italic font-normal">(opsional)</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        required={field.required}
                        name={field.key}
                        value={formData[field.key] ?? ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-primary/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all rounded-2xl text-sm appearance-none custom-select-arrow"
                      >
                        <option value="" disabled className="bg-zinc-900 leading-8">{field.placeholder || '-- Pilih --'}</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt} className="bg-zinc-900 leading-8">{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        required={field.required}
                        name={field.key}
                        type={field.type}
                        value={formData[field.key] ?? ''}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-primary/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all rounded-2xl placeholder:text-gray-700 text-sm"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-yellow-500 text-black font-sans font-black text-sm tracking-[0.1em] py-5 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 uppercase"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
                    ) : (
                      'Konfirmasi Pendaftaran'
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20"></div>
                <CheckCircle className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
              </div>
              <h3 className="text-3xl font-sans font-black text-white mb-4 uppercase tracking-tight">
                {event.successTitle || 'Berhasil!'}
              </h3>
              <p className="text-gray-400 mb-10 max-w-xs leading-relaxed text-sm">
                {event.successMessage || 'Pendaftaran Anda telah kami terima.'}
              </p>
              <button
                onClick={onClose}
                className="w-full py-4 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 font-black uppercase tracking-widest text-xs rounded-2xl"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;

