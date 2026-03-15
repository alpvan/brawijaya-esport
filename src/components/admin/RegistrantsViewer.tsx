import React, { useEffect, useState, useMemo } from 'react';
import { useRegistrantsStore, RegistrantItem } from '../../store/useRegistrantsStore';
import { useEventsStore } from '../../store/useEventsStore';
import { Loader2, Users, Search, Download, Trash2, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const RegistrantsViewer = () => {
    const { registrantsList, loading, fetchRegistrants, clearRegistrants } = useRegistrantsStore();
    const { eventsList, fetchEvents } = useEventsStore();
    const [search, setSearch] = useState('');
    const [filterEvent, setFilterEvent] = useState('');
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [selectedRegistrant, setSelectedRegistrant] = useState<RegistrantItem | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchRegistrants();
        fetchEvents();
    }, [fetchRegistrants, fetchEvents]);

    // Get unique event names for filter dropdown
    const eventNames = Array.from(new Set(registrantsList.map((r) => r.eventName)));

    // Get form fields for the currently filtered event
    const activeEventFields = useMemo(() => {
        if (!filterEvent) return null;
        const ev = eventsList.find(e => e.title === filterEvent);
        return ev?.formFields || null;
    }, [filterEvent, eventsList]);

    const filtered = useMemo(() => {
        return registrantsList.filter((r) => {
            const matchesSearch =
                r.namaLengkap?.toLowerCase().includes(search.toLowerCase()) ||
                r.nim?.toLowerCase().includes(search.toLowerCase()) ||
                r.fakultas?.toLowerCase().includes(search.toLowerCase());
            const matchesEvent = filterEvent ? r.eventName === filterEvent : true;
            return matchesSearch && matchesEvent;
        });
    }, [registrantsList, search, filterEvent]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filtered.slice(startIndex, startIndex + itemsPerPage);
    }, [filtered, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterEvent]);

    const handleExportCSV = () => {
        // Find all unique keys present in the filtered data to ensure nothing is missed
        const allKeys = new Set<string>(['timestamp', 'eventName']);
        filtered.forEach(r => {
            Object.keys(r).forEach(k => {
                if (k !== 'id' && k !== 'timestamp' && k !== 'eventName') {
                    allKeys.add(k);
                }
            });
        });

        const headers = Array.from(allKeys).map(k => {
            if (k === 'timestamp') return 'Waktu';
            if (k === 'eventName') return 'Acara';
            // Try to find a label for this key from event fields
            const field = eventsList.flatMap(e => e.formFields || []).find(f => f.key === k);
            return field?.label || k;
        });

        const rows = filtered.map((r: any) => {
            return Array.from(allKeys).map(k => {
                const val = r[k];
                if (k === 'timestamp') return r.timestamp?.toDate?.()?.toLocaleString('id-ID') ?? '-';
                return val || '-';
            });
        });

        const csvContent =
            'data:text/csv;charset=utf-8,' +
            [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        
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
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl relative">
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
                <div className="text-center py-12 text-gray-500 bg-zinc-950 rounded-xl border border-dashed border-zinc-800">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-40 text-gray-400" />
                    <p className="font-medium text-gray-400">Belum ada data pendaftar.</p>
                    {search || filterEvent ? <p className="text-xs mt-1">Coba ubah kata kunci atau filter Anda.</p> : null}
                </div>
            ) : (
                <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-4 py-4 font-bold text-[#00f0ff] uppercase tracking-wider text-[10px]">#</th>
                                    <th className="px-4 py-4 font-bold text-gray-400 uppercase tracking-wider text-[10px] whitespace-nowrap">Waktu Daftar</th>
                                    <th className="px-4 py-4 font-bold text-gray-400 uppercase tracking-wider text-[10px] whitespace-nowrap">Nama Lengkap</th>
                                    <th className="px-4 py-4 font-bold text-gray-400 uppercase tracking-wider text-[10px]">NIM</th>
                                    <th className="px-4 py-4 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Fakultas</th>
                                    {!filterEvent && <th className="px-4 py-4 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Acara</th>}
                                    <th className="px-4 py-4 font-bold text-gray-400 uppercase tracking-wider text-[10px] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((r, index) => (
                                    <tr key={r.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                                            {r.timestamp?.toDate ? format(r.timestamp.toDate(), 'dd MMM yyyy, HH:mm', { locale: id }) : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-white font-medium">
                                            <div className="flex items-center gap-2">
                                                {r.namaLengkap}
                                                {r.telepon && (
                                                    <a 
                                                        href={`https://wa.me/${r.telepon.replace(/\D/g, '').replace(/^0/, '62')}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-green-500 hover:text-green-400 transition-colors"
                                                        title="Chat via WhatsApp"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.04 2.872 1.185 3.07c.145.198 2.046 3.123 4.956 4.378.692.298 1.232.476 1.652.61.696.22 1.328.19 1.83.115.56-.083 1.72-.703 1.963-1.383.243-.68.243-1.264.17-1.383-.074-.119-.272-.192-.57-.341zM12.01 21.003L12 21c-1.608 0-3.187-.433-4.562-1.252l-.327-.195-3.391.889.905-3.307-.215-.341C3.585 15.397 3 13.734 3 12c0-4.962 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9zm0-19.5c-5.79 0-10.5 4.71-10.5 10.5 0 1.847.485 3.652 1.408 5.245L1 23l5.895-1.545C8.428 22.455 10.2 23 12.01 23c5.79 0 10.5-4.71 10.5-10.5S17.8 1.5 12.01 1.5z"/></svg>
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">{r.nim}</td>
                                        <td className="px-4 py-3 text-gray-300 text-xs">{r.fakultas}</td>
                                        {!filterEvent && (
                                            <td className="px-4 py-3">
                                                <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-[9px] font-bold uppercase tracking-wider">
                                                    {r.eventName}
                                                </span>
                                            </td>
                                        )}
                                        <td className="px-4 py-3 text-right">
                                            <button 
                                                onClick={() => setSelectedRegistrant(r)}
                                                className="p-2 text-gray-500 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded-lg transition-all"
                                                title="Lihat Detail Lengkap"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="px-4 py-3 flex items-center justify-between border-t border-zinc-800 bg-zinc-900/50">
                            <span className="text-xs text-gray-500">
                                Menampilkan <span className="font-bold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="font-bold text-white">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> dari <span className="font-bold text-white">{filtered.length}</span> pendaftar
                            </span>
                            <div className="flex gap-1">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-1 rounded bg-zinc-800 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex items-center px-3 text-xs font-bold text-white">
                                    {currentPage} / {totalPages}
                                </div>
                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-1 rounded bg-zinc-800 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Detail Modal */}
            {selectedRegistrant && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50"></div>
                        
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                            <div>
                                <h3 className="text-lg font-bold text-white">Detail Pendaftar</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-0.5">{selectedRegistrant.eventName}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedRegistrant(null)}
                                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                            {/* Standard Fields */}
                            {[
                                { label: 'Waktu Daftar', val: selectedRegistrant.timestamp?.toDate ? format(selectedRegistrant.timestamp.toDate(), 'dd MMMM yyyy, HH:mm', { locale: id }) : '-' },
                                { label: 'Nama Lengkap', val: selectedRegistrant.namaLengkap },
                                { label: 'NIM', val: selectedRegistrant.nim },
                                { label: 'Fakultas', val: selectedRegistrant.fakultas },
                                { label: 'Telepon / WA', val: selectedRegistrant.telepon, isPhone: true },
                                { label: 'Instagram', val: selectedRegistrant.instagram },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest">{item.label}</label>
                                        {item.isPhone && item.val && (
                                            <a 
                                                href={`https://wa.me/${item.val.replace(/\D/g, '').replace(/^0/, '62')}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-[9px] font-bold text-green-500 hover:text-green-400 uppercase tracking-widest flex items-center gap-1"
                                            >
                                                Chat WhatsApp
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-white font-medium bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/50">{item.val || '-'}</p>
                                </div>
                            ))}

                            {/* Additional Custom Fields */}
                            {Object.entries(selectedRegistrant)
                                .filter(([key]) => !['id', 'eventName', 'namaLengkap', 'nim', 'fakultas', 'telepon', 'instagram', 'timestamp'].includes(key))
                                .map(([key, val]) => {
                                    // Try to find label from events
                                    const fieldDefinition = eventsList
                                        .find(e => e.title === selectedRegistrant.eventName)
                                        ?.formFields?.find(f => f.key === key);
                                    
                                    return (
                                        <div key={key} className="space-y-1">
                                            <label className="text-[9px] text-[#00f0ff] uppercase font-black tracking-widest">
                                                {fieldDefinition?.label || key}
                                            </label>
                                            <p className="text-sm text-white font-medium bg-zinc-900/50 p-2.5 rounded-xl border border-[#00f0ff]/10">{String(val)}</p>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className="p-6 bg-zinc-900/30 border-t border-zinc-800">
                            <button 
                                onClick={() => setSelectedRegistrant(null)}
                                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-widest"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
