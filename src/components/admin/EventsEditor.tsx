import React, { useState, useEffect } from 'react';
import { useEventsStore, EventItem, DetailCard } from '../../store/useEventsStore';
import { Plus, Trash2, Save, Loader2, Check, X } from 'lucide-react';

const emptyEvent: Omit<EventItem, 'id'> = {
    title: '',
    desc: '',
    date: '',
    month: '',
    active: true,
    tag: '',
    btn: 'Daftar',
    location: '',
    time: '',
    content: '',
    detailCards: [
        { id: 'card_1', label: 'Jadwal', value: '', icon: 'clock' },
        { id: 'card_2', label: 'Peserta', value: '', icon: 'users' },
        { id: 'card_3', label: 'Hadiah', value: '', icon: 'trophy' },
    ],
    formFields: [
        { key: 'namaLengkap', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap Anda', type: 'text', required: true },
        { key: 'nim', label: 'NIM', placeholder: 'mis. 215150...', type: 'text', required: true },
        { key: 'fakultas', label: 'Fakultas', placeholder: 'mis. Filkom', type: 'text', required: true },
        { key: 'telepon', label: 'Nomor Telepon / WA', placeholder: 'mis. 08123456789', type: 'tel', required: true },
        { key: 'instagram', label: 'Instagram', placeholder: '@username', type: 'text', required: true },
    ],
    successTitle: 'Pendaftaran Berhasil!',
    successMessage: 'Anda telah berhasil mendaftar. Kami akan menghubungi Anda melalui WhatsApp atau Instagram segera.',
    externalLink: '',
};

export const EventsEditor = () => {
    const { eventsList, loading, fetchEvents, addEvent, updateEvent, deleteEvent } = useEventsStore();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Omit<EventItem, 'id'>>(emptyEvent);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'basic' | 'details' | 'form'>('basic');
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddField = () => {
        const newField = {
            key: `custom_${Date.now()}`,
            label: 'Field Baru',
            placeholder: 'Masukkan data...',
            type: 'text',
            required: true,
        };
        setFormData((prev) => ({
            ...prev,
            formFields: [...(prev.formFields || []), newField],
        }));
    };

    const handleRemoveField = (key: string) => {
        setFormData((prev) => ({
            ...prev,
            formFields: (prev.formFields || []).filter((f) => f.key !== key),
        }));
    };

    const handleFieldChange = (key: string, fieldData: Partial<any>) => {
        setFormData((prev) => ({
            ...prev,
            formFields: (prev.formFields || []).map((f) => (f.key === key ? { ...f, ...fieldData } : f)),
        }));
    };

    const handleAddOption = (fieldKey: string) => {
        const field = formData.formFields?.find(f => f.key === fieldKey);
        if (!field) return;
        const currentOptions = field.options || [];
        handleFieldChange(fieldKey, { options: [...currentOptions, ''] });
    };

    const handleOptionChange = (fieldKey: string, optIdx: number, value: string) => {
        const field = formData.formFields?.find(f => f.key === fieldKey);
        if (!field) return;
        const newOptions = [...(field.options || [])];
        newOptions[optIdx] = value;
        handleFieldChange(fieldKey, { options: newOptions });
    };

    const handleRemoveOption = (fieldKey: string, optIdx: number) => {
        const field = formData.formFields?.find(f => f.key === fieldKey);
        if (!field) return;
        const newOptions = (field.options || []).filter((_, i) => i !== optIdx);
        handleFieldChange(fieldKey, { options: newOptions });
    };

    const handleEdit = (event: EventItem) => {
        setEditingId(event.id);
        const { id, ...rest } = event;
        setFormData({
            ...emptyEvent,
            ...rest
        });
        setShowForm(true);
    };

    const handleResetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData(emptyEvent);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg('');
        try {
            if (editingId) {
                await updateEvent(editingId, formData);
                setSuccessMsg('Acara berhasil diperbarui!');
            } else {
                await addEvent(formData as any);
                setSuccessMsg('Acara baru berhasil ditambahkan!');
            }
            handleResetForm();
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            alert('Gagal menyimpan. Coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus acara ini?')) return;
        try {
            await deleteEvent(id);
        } catch (err) {
            alert('Gagal menghapus acara.');
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white">Kelola Daftar Acara</h2>
                <button
                    onClick={() => { handleResetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff] hover:bg-[#00c0cc] text-black font-bold rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" /> Tambah Acara Baru
                </button>
            </div>

            {successMsg && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                    {successMsg}
                </div>
            )}

            {showForm && (
                <div className="bg-zinc-950 border border-[#00f0ff]/30 rounded-xl p-6 overflow-y-auto max-h-[85vh]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-[#00f0ff]">{editingId ? 'Edit Acara' : 'Tambah Acara Baru'}</h3>
                        <button onClick={handleResetForm} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    
                    <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar border-b border-zinc-800">
                        <button 
                            type="button" 
                            onClick={() => setActiveSection('basic')}
                            className={`px-4 py-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeSection === 'basic' ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}
                        >
                            Informasi Dasar
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setActiveSection('details')}
                            className={`px-4 py-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeSection === 'details' ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}
                        >
                            Kotak Panel Detail
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setActiveSection('form')}
                            className={`px-4 py-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeSection === 'form' ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}
                        >
                            Form Pendaftaran
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold border-b border-zinc-800 pb-2">Informasi Dasar</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Judul Acara *</label>
                                    <input required name="title" value={formData.title} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: MLBB National Championship" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Deskripsi Singkat *</label>
                                    <input required name="desc" value={formData.desc} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: Turnamen Mobile Legends tingkat nasional" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Tanggal (angka) *</label>
                                    <input required name="date" value={formData.date} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: 22" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Bulan *</label>
                                    <input required name="month" value={formData.month} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: Mar" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Lokasi</label>
                                    <input name="location" value={formData.location} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: GOR Universitas Brawijaya" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Waktu</label>
                                    <input name="time" value={formData.time} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: 09:00 WIB" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Tombol Aksi</label>
                                    <select name="btn" value={formData.btn} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none">
                                        <option value="Daftar">Daftar</option>
                                        <option value="Info">Info</option>
                                        <option value="">Tidak Ada (gunakan Tag)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Tag (jika tidak ada tombol)</label>
                                    <input name="tag" value={formData.tag} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: Selesai" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Tautan Eksternal (Opsional)</label>
                                    <input name="externalLink" value={formData.externalLink} onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none"
                                        placeholder="Contoh: https://wa.me/... atau link form" />
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" id="active" name="active" checked={formData.active}
                                            onChange={handleChange} className="w-4 h-4 accent-[#00f0ff]" />
                                        <label htmlFor="active" className="text-sm text-gray-400">Acara Aktif (ditampilkan dengan warna penuh)</label>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Deskripsi Lengkap (opsional)</label>
                                        <textarea name="content" value={formData.content} onChange={handleChange} rows={3}
                                            className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none resize-none"
                                            placeholder="Deskripsi lengkap acara yang akan ditampilkan di pop-up detail..." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold border-b border-zinc-800 pb-2">Kotak Detail Acara (Pop-up "Pelajari Lebih Lanjut")</h4>
                            <p className="text-xs text-gray-500 -mt-2">Setiap kotak akan ditampilkan saat pengunjung mengklik "Pelajari Lebih Lanjut". Anda bisa menambah, menghapus, dan mengatur setiap kotak.</p>
                            
                            <div className="space-y-4">
                                {(formData.detailCards || []).map((card, idx) => (
                                    <div key={card.id} className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/50 space-y-4 group transition-all hover:border-[#00f0ff]/20">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] text-[#00f0ff] uppercase font-black tracking-widest">Kotak {idx + 1}</span>
                                            <button type="button" onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    detailCards: (prev.detailCards || []).filter(c => c.id !== card.id),
                                                }));
                                            }}
                                                className="p-2 text-gray-600 hover:text-red-400 transition-colors bg-zinc-950 rounded-lg border border-zinc-800"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-end">
                                            <div className="flex-1 min-w-[160px] space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Label Kotak</label>
                                                <input value={card.label} onChange={(e) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        detailCards: (prev.detailCards || []).map(c => c.id === card.id ? { ...c, label: e.target.value } : c),
                                                    }));
                                                }}
                                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff]/50 rounded-lg p-3 text-white text-xs outline-none transition-all"
                                                    placeholder="Contoh: Jadwal, Peserta, Hadiah" />
                                            </div>
                                            <div className="flex-[2] min-w-[200px] space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Isi / Nilai</label>
                                                <input value={card.value} onChange={(e) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        detailCards: (prev.detailCards || []).map(c => c.id === card.id ? { ...c, value: e.target.value } : c),
                                                    }));
                                                }}
                                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff]/50 rounded-lg p-3 text-white text-xs outline-none transition-all"
                                                    placeholder="Contoh: Sabtu 22 Mar, Terbuka untuk Semua, Rp 5.000.000" />
                                            </div>
                                            <div className="w-36 space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Ikon</label>
                                                <select value={card.icon} onChange={(e) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        detailCards: (prev.detailCards || []).map(c => c.id === card.id ? { ...c, icon: e.target.value } : c),
                                                    }));
                                                }}
                                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white text-xs outline-none focus:border-[#00f0ff]/50 transition-all"
                                                >
                                                    <option value="clock">⏰ Jam</option>
                                                    <option value="users">👥 Orang</option>
                                                    <option value="trophy">🏆 Piala</option>
                                                    <option value="mappin">📍 Lokasi</option>
                                                    <option value="briefcase">💼 Tas Kerja</option>
                                                    <option value="star">⭐ Bintang</option>
                                                    <option value="zap">⚡ Petir</option>
                                                    <option value="gift">🎁 Hadiah</option>
                                                    <option value="calendar">📅 Kalender</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => {
                                    const newCard: DetailCard = {
                                        id: `card_${Date.now()}`,
                                        label: 'Kotak Baru',
                                        value: '',
                                        icon: 'star',
                                    };
                                    setFormData(prev => ({
                                        ...prev,
                                        detailCards: [...(prev.detailCards || []), newCard],
                                    }));
                                }}
                                    className="w-full py-4 border-2 border-dashed border-zinc-800 text-gray-500 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 rounded-xl transition-all text-sm font-bold flex items-center justify-center gap-3 bg-zinc-900/20"
                                >
                                    <Plus className="w-5 h-5" /> Tambah Kotak Detail Baru
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold border-b border-zinc-800 pb-2">Kustomisasi Form Pendaftaran (Google Form Style)</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">Judul Sukses</label>
                                    <input value={formData.successTitle} onChange={(e) => setFormData(p => ({...p, successTitle: e.target.value}))}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white text-sm outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">Pesan Pengumuman</label>
                                    <textarea value={formData.successMessage} onChange={(e) => setFormData(p => ({...p, successMessage: e.target.value}))}
                                        rows={2} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white text-sm outline-none resize-none" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {(formData.formFields || []).map((field, idx) => (
                                    <div key={field.key} className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/50 space-y-4 group transition-all hover:border-[#00f0ff]/20">
                                        <div className="flex flex-wrap gap-4 items-end">
                                            <div className="flex-1 min-w-[200px] space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Label Field</label>
                                                <input value={field.label} onChange={(e) => handleFieldChange(field.key, {label: e.target.value})}
                                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff]/50 rounded-lg p-3 text-white text-xs outline-none transition-all" />
                                            </div>
                                            <div className="flex-1 min-w-[200px] space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Placeholder / Hint</label>
                                                <input value={field.placeholder} onChange={(e) => handleFieldChange(field.key, {placeholder: e.target.value})}
                                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff]/50 rounded-lg p-3 text-white text-xs outline-none transition-all" />
                                            </div>
                                            <div className="w-32 space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Tipe Input</label>
                                                <select value={field.type} onChange={(e) => handleFieldChange(field.key, {type: e.target.value})}
                                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white text-xs outline-none focus:border-[#00f0ff]/50 transition-all">
                                                    <option value="text">Teks</option>
                                                    <option value="number">Angka</option>
                                                    <option value="tel">Telepon/WA</option>
                                                    <option value="email">Email</option>
                                                    <option value="select">Dropdown (Pilihan)</option>
                                                </select>
                                            </div>
                                            <div className="w-24 space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Wajib?</label>
                                                <select value={field.required ? 'yes' : 'no'} onChange={(e) => handleFieldChange(field.key, {required: e.target.value === 'yes'})}
                                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white text-xs outline-none transition-all">
                                                    <option value="yes">Ya</option>
                                                    <option value="no">Tidak</option>
                                                </select>
                                            </div>
                                            <button type="button" onClick={() => handleRemoveField(field.key)}
                                                className="p-3 text-gray-600 hover:text-red-400 transition-colors bg-zinc-950 rounded-lg border border-zinc-800">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {field.type === 'select' && (
                                            <div className="pt-4 space-y-3 animate-fade-in border-t border-zinc-800/50 mt-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] text-[#00f0ff] uppercase font-black tracking-widest block">Opsi Dropdown (Pilihan)</label>
                                                    <button type="button" onClick={() => handleAddOption(field.key)}
                                                        className="text-[10px] bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 px-3 py-1 rounded-full font-bold hover:bg-[#00f0ff]/20 transition-all flex items-center gap-1">
                                                        <Plus className="w-3 h-3" /> Tambah Pilihan
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {(field.options || []).map((opt, optIdx) => (
                                                        <div key={optIdx} className="flex gap-2 group/opt bg-zinc-950 p-2 rounded-lg border border-zinc-800 focus-within:border-[#00f0ff]/30 transition-all">
                                                            <input 
                                                                value={opt} 
                                                                onChange={(e) => handleOptionChange(field.key, optIdx, e.target.value)}
                                                                className="flex-1 bg-transparent text-white text-[11px] outline-none placeholder:text-zinc-700"
                                                                placeholder={`Opsi ${optIdx + 1}`}
                                                            />
                                                            <button type="button" onClick={() => handleRemoveOption(field.key, optIdx)}
                                                                className="text-gray-600 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-all">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {(field.options || []).length === 0 && (
                                                        <div className="sm:col-span-2 text-center py-4 border border-dashed border-zinc-800 rounded-lg text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                                                            Belum ada pilihan. Klik "Tambah Pilihan"
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddField}
                                    className="w-full py-4 border-2 border-dashed border-zinc-800 text-gray-500 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 rounded-xl transition-all text-sm font-bold flex items-center justify-center gap-3 bg-zinc-900/20">
                                    <Plus className="w-5 h-5" /> Tambah Field Input Baru
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                            <button type="button" onClick={handleResetForm}
                                className="px-4 py-2 border border-zinc-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                                Batal
                            </button>
                            <button type="submit" disabled={saving}
                                className="flex items-center gap-2 px-6 py-2 bg-[#00f0ff] hover:bg-[#00c0cc] text-black font-bold rounded-lg transition-colors disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {saving ? 'Menyimpan...' : 'Simpan Acara'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
            ) : eventsList.length === 0 ? (
                <div className="text-center py-12 text-gray-500">Belum ada acara. Klik "Tambah Acara Baru" untuk memulai.</div>
            ) : (
                <div className="space-y-3">
                    {eventsList.map((event) => (
                        <div key={event.id}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                            <div className="flex items-start gap-4">
                                <div className="text-center w-16 shrink-0">
                                    <span className={`block text-2xl font-black ${event.active ? 'text-yellow-400' : 'text-gray-500'}`}>{event.date}</span>
                                    <span className="text-xs text-gray-500 uppercase font-bold">{event.month}</span>
                                </div>
                                <div>
                                    <p className={`font-bold ${event.active ? 'text-white' : 'text-gray-400'}`}>{event.title}</p>
                                    <p className="text-sm text-gray-500 mt-1">{event.desc}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${event.active ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-gray-800 text-gray-500'}`}>
                                            {event.active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                        {event.btn && <span className="text-xs px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">{event.btn}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => handleEdit(event)}
                                    className="px-4 py-2 text-sm border border-zinc-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(event.id)}
                                    className="px-4 py-2 text-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
