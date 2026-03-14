import React, { useEffect } from 'react';
import { useEventsStore } from '../../store/useEventsStore';
import { useRegistrantsStore } from '../../store/useRegistrantsStore';
import { usePrestasiStore } from '../../store/usePrestasiStore';
import { Users, Calendar, Trophy, ArrowUpRight, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export const OverviewDashboard = () => {
    const { eventsList, fetchEvents } = useEventsStore();
    const { registrantsList, fetchRegistrants } = useRegistrantsStore();
    const { prestasiList, fetchPrestasi } = usePrestasiStore();

    useEffect(() => {
        fetchEvents();
        fetchRegistrants();
        fetchPrestasi();
    }, [fetchEvents, fetchRegistrants, fetchPrestasi]);

    const activeEvents = eventsList.filter(e => e.active).length;
    const totalRegistrants = registrantsList.length;
    const totalPrestasi = prestasiList.length;

    // Get the top 5 most recent registrants
    const recentRegistrants = [...registrantsList]
        .sort((a, b) => {
            const timeA = a.timestamp?.toMillis?.() || 0;
            const timeB = b.timestamp?.toMillis?.() || 0;
            return timeB - timeA;
        })
        .slice(0, 5);

    const stats = [
        {
            title: 'Total Pendaftar',
            value: totalRegistrants,
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            title: 'Acara Aktif',
            value: activeEvents,
            icon: Calendar,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20'
        },
        {
            title: 'Galeri Prestasi',
            value: totalPrestasi,
            icon: Trophy,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6">Ringkasan Dashboard</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} flex items-center gap-4`}>
                        <div className={`p-4 rounded-xl bg-black/50 ${stat.color} shadow-inner`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
                            <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#00f0ff]" />
                            <h3 className="text-lg font-bold text-white">Pendaftaran Terbaru</h3>
                        </div>
                    </div>

                    {recentRegistrants.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 border border-dashed border-zinc-800 rounded-xl">
                            Belum ada aktivitas pendaftaran.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentRegistrants.map((reg, idx) => (
                                <div key={reg.id || idx} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-blue-500 flex items-center justify-center text-black font-bold shrink-0">
                                        {reg.namaLengkap?.[0]?.toUpperCase() || '?'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">
                                            {reg.namaLengkap} <span className="text-gray-500 font-normal">mendaftar untuk</span> <span className="text-[#00f0ff]">{reg.eventName}</span>
                                        </p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                            <span className="truncate">{reg.fakultas} ({reg.nim})</span>
                                            <span>•</span>
                                            <span>
                                                {reg.timestamp?.toDate ? formatDistanceToNow(reg.timestamp.toDate(), { addSuffix: true, locale: id }) : 'Baru saja'}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-white bg-zinc-900 rounded-lg shrink-0">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions / System Status */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Status Sistem</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Database (Firestore)</span>
                                <span className="flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>
                            <p className="text-xs text-green-400 font-medium">Online & Terhubung</p>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Pendaftaran Publik</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">Aktif</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Sistem menerima form otomatis via web.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
