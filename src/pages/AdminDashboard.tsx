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
        <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-5 md:p-6 rounded-2xl">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#00ff9d]">
                            Dashboard Admin
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm">Selamat datang, <span className="text-white">{user?.email}</span></p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-colors w-fit"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-1/5 flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap w-full text-left ${activeTab === tab.id
                                    ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30'
                                    : 'bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5 shrink-0" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Workspace */}
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
