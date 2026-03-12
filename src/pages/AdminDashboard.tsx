import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut, Calendar, Trophy, Users, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { PrestasiEditor } from '../components/admin/PrestasiEditor';
import { EventsEditor } from '../components/admin/EventsEditor';
import { RegistrantsViewer } from '../components/admin/RegistrantsViewer';

const tabs = [
    { id: 'prestasi', label: 'Gambar Prestasi', icon: Trophy },
    { id: 'events', label: 'Kelola Acara', icon: Calendar },
    { id: 'registrants', label: 'Data Pendaftar', icon: Users },
];

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('prestasi');

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/alvan/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-3 sm:p-6 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-4 sm:p-6 rounded-2xl">
                    <div className="text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#00ff9d] tracking-tight">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1 text-[10px] sm:text-xs">
                            Active as <span className="text-white font-bold">{user?.email}</span>
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl transition-all w-full sm:w-auto text-xs font-bold uppercase tracking-wider"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/5 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-xl font-black text-[10px] sm:text-xs transition-all whitespace-nowrap lg:w-full text-left uppercase tracking-widest ${activeTab === tab.id
                                    ? 'bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                                    : 'bg-zinc-900 border border-zinc-800 text-gray-500 hover:text-white hover:border-zinc-700'
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id ? 'text-black' : 'text-gray-500'}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="lg:flex-1">
                        {activeTab === 'prestasi' && <PrestasiEditor />}
                        {activeTab === 'events' && <EventsEditor />}
                        {activeTab === 'registrants' && <RegistrantsViewer />}
                    </div>
                </div>
            </div>
        </div>
    );
};
