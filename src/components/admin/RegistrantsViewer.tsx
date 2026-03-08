import React, { useEffect, useState } from 'react';
import { useRegistrantsStore } from '../../store/useRegistrantsStore';
import { Loader2, Users, Search, Download, Trash2, AlertTriangle } from 'lucide-react';

export const RegistrantsViewer = () => {
    const { registrantsList, loading, fetchRegistrants, clearRegistrants } = useRegistrantsStore();
    const [search, setSearch] = useState('');
    const [filterEvent, setFilterEvent] = useState('');
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    useEffect(() => {
        fetchRegistrants();
    }, [fetchRegistrants]);

    // Get unique event names for filter dropdown
    const eventNames = Array.from(new Set(registrantsList.map((r) => r.eventName)));

    const filtered = registrantsList.filter((r) => {
        const matchesSearch =
            r.namaLengkap?.toLowerCase().includes(search.toLowerCase()) ||
            r.nim?.toLowerCase().includes(search.toLowerCase()) ||
            r.fakultas?.toLowerCase().includes(search.toLowerCase());
        const matchesEvent = filterEvent ? r.eventName === filterEvent : true;
        return matchesSearch && matchesEvent;
    });

    const handleExportCSV = () => {
        const headers = ['Waktu', 'Acara', 'Nama', 'NIM', 'Fakultas', 'Telepon', 'Instagram'];
        const rows = filtered.map((r) => [
            r.timestamp?.toDate?.()?.toLocaleString('id-ID') ?? '-',
            r.eventName,
            r.namaLengkap,
            r.nim,
            r.fakultas,
            r.telepon,
            r.instagram,
        ]);
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
        const link = document.createElement('a');
        link.href = encodeURI(csvContent);
        link.download = `pendaftar-${filterEvent || 'semua'}-${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.csv`;
        link.click();
    };

    const handleClearData = async () => {
        setIsClearing(true);
        try {
            await clearRegistrants();
            setIsConfirmingClear(false);
        } catch (error) {
            console.error("Failed to clear:", error);
            alert("Gagal menghapus data. Periksa koneksi atau izin Firebase Anda.");
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Data Pendaftar</h2>
                    <p className="text-sm text-gray-400 mt-1">Total: <span className="text-white font-bold">{filtered.length}</span> pendaftar</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
                    <button
                        onClick={handleExportCSV}
                        disabled={filtered.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/40 text-green-400 font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    
                    {isConfirmingClear ? (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/40 rounded-lg p-1 pr-3">
                            <button
                                onClick={handleClearData}
                                disabled={isClearing}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition-colors text-sm disabled:opacity-50"
                            >
                                {isClearing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                Yakin Hapus
                            </button>
                            <button
                                onClick={() => setIsConfirmingClear(false)}
                                disabled={isClearing}
                                className="text-gray-400 hover:text-white px-2 py-1 text-sm font-medium disabled:opacity-50"
                            >
                                Batal
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsConfirmingClear(true)}
                            disabled={registrantsList.length === 0 || loading}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-500 font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Hapus semua data pendaftar"
                        >
                            <Trash2 className="w-4 h-4" />
                            Bersihkan Data
                        </button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Cari nama, NIM, atau fakultas..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-700 focus:border-[#00f0ff] rounded-lg pl-10 pr-4 py-2.5 text-white outline-none text-sm"
                    />
                </div>
                <select
                    value={filterEvent}
                    onChange={(e) => setFilterEvent(e.target.value)}
                    className="bg-zinc-950 border border-zinc-700 focus:border-[#00f0ff] rounded-lg px-4 py-2.5 text-white outline-none text-sm"
                >
                    <option value="">Semua Acara</option>
                    {eventNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p>Belum ada data pendaftar.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-800">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-zinc-950 text-gray-400 border-b border-zinc-800">
                                <th className="text-left px-4 py-3 font-semibold">#</th>
                                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Waktu Daftar</th>
                                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Nama Lengkap</th>
                                <th className="text-left px-4 py-3 font-semibold">NIM</th>
                                <th className="text-left px-4 py-3 font-semibold">Fakultas</th>
                                <th className="text-left px-4 py-3 font-semibold">Telepon</th>
                                <th className="text-left px-4 py-3 font-semibold">Instagram</th>
                                <th className="text-left px-4 py-3 font-semibold">Acara</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r, index) => (
                                <tr key={r.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors">
                                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                                        {r.timestamp?.toDate?.()?.toLocaleString('id-ID') ?? '-'}
                                    </td>
                                    <td className="px-4 py-3 text-white font-medium">{r.namaLengkap}</td>
                                    <td className="px-4 py-3 text-gray-300">{r.nim}</td>
                                    <td className="px-4 py-3 text-gray-300">{r.fakultas}</td>
                                    <td className="px-4 py-3 text-gray-300">{r.telepon}</td>
                                    <td className="px-4 py-3 text-[#00f0ff]">{r.instagram}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-xs whitespace-nowrap">
                                            {r.eventName}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
