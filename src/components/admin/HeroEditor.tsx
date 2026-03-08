import React, { useState, useEffect } from 'react';
import { useContentStore } from '../../../src/store/useContentStore';
import { Save, Loader2 } from 'lucide-react';

export const HeroEditor = () => {
    const { hero, fetchContent, updateHeroContent, loading } = useContentStore();
    const [formData, setFormData] = useState(hero);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    useEffect(() => {
        setFormData(hero);
    }, [hero]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg('');
        try {
            await updateHeroContent(formData);
            setSuccessMsg('Perubahan berhasil disimpan!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (error) {
            console.error("Gagal menyimpan:", error);
            alert("Gagal menyimpan perubahan, periksa koneksi internet Anda.");
        } finally {
            setSaving(false);
        }
    };

    if (loading && !formData.titleText1) {
        return <div className="text-gray-400 p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                Edit Bagian Hero (Beranda Atas)
            </h2>

            {successMsg && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Teks Judul Baris 1</label>
                        <input
                            type="text"
                            name="titleText1"
                            value={formData.titleText1}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none transition-colors"
                            placeholder="Contoh: BRAWIJAYA"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Teks Judul Baris 2 (Bisa efek Glitch)</label>
                        <input
                            type="text"
                            name="titleText2"
                            value={formData.titleText2}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none transition-colors"
                            placeholder="Contoh: ESPORT"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Deskripsi Singkat</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff] rounded-lg p-3 text-white outline-none transition-colors resize-y leading-relaxed"
                        placeholder="Tuliskan deskripsi singkat tentang UKM ini..."
                    />
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-[#00f0ff] hover:bg-[#00c0cc] text-black font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </form>
        </div>
    );
};
