import React, { useState, useEffect, useRef } from 'react';
import { usePrestasiStore, PrestasiItem } from '../../store/usePrestasiStore';
import { Upload, Trash2, Save, Loader2 } from 'lucide-react';

export const PrestasiEditor = () => {
    const { prestasiList, loading, fetchPrestasi, updatePrestasiList, uploadPrestasiImage } = usePrestasiStore();
    const [items, setItems] = useState<PrestasiItem[]>([]);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchPrestasi();
    }, [fetchPrestasi]);

    useEffect(() => {
        setItems(prestasiList);
    }, [prestasiList]);

    const handleUploadAndAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const tempId = `temp-${Date.now()}`;
        setUploading(tempId);

        try {
            const url = await uploadPrestasiImage(file);
            const newItem: PrestasiItem = {
                id: tempId,
                src: url,
                title: 'Judul Prestasi Baru',
                desc: 'Kategori',
            };
            setItems((prev) => [...prev, newItem]);
        } catch (err) {
            alert('Gagal mengunggah gambar. Pastikan Firebase Storage sudah aktif dan Rules-nya sudah diatur.');
        } finally {
            setUploading(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleChange = (id: string, field: keyof PrestasiItem, value: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSaveAll = async () => {
        setSaving(true);
        setSuccessMsg('');
        try {
            await updatePrestasiList(items);
            setSuccessMsg('Semua perubahan berhasil disimpan!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            alert('Gagal menyimpan. Coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-white">Kelola Gambar Prestasi</h2>
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={!!uploading}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? 'Mengunggah...' : 'Upload Gambar Baru'}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadAndAdd}
                    />
                    <button
                        onClick={handleSaveAll}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff] hover:bg-[#00c0cc] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Menyimpan...' : 'Simpan Semua'}
                    </button>
                </div>
            </div>

            {successMsg && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                    {successMsg}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
            ) : items.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    <Upload className="w-12 h-12 mx-auto mb-4 opacity-40" />
                    <p>Belum ada gambar. Klik &quot;Upload Gambar Baru&quot; untuk menambahkan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden group">
                            <div className="relative aspect-video bg-zinc-900">
                                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <div className="p-4 space-y-3">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Judul</label>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-2 text-white text-sm outline-none"
                                        placeholder="Judul prestasi"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Kategori / Deskripsi Singkat</label>
                                    <input
                                        type="text"
                                        value={item.desc}
                                        onChange={(e) => handleChange(item.id, 'desc', e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00f0ff] rounded-lg p-2 text-white text-sm outline-none"
                                        placeholder="Contoh: Turnamen Regional"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
