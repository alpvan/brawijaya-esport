import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LayoutDashboard, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError('Gagal login: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00f0ff]/20 to-[#00f0ff]/5 rounded-2xl flex items-center justify-center mb-4 border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                        <LayoutDashboard className="w-8 h-8 text-[#00f0ff]" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Admin <span className="text-[#00f0ff]">Panel</span></h1>
                    <p className="text-gray-400 text-xs sm:text-sm text-center max-w-[250px]">Kelola ekosistem digital Brawijaya Esport</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2 relative z-10">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00f0ff] transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 rounded-xl py-3.5 pl-10 pr-4 text-white outline-none transition-all"
                                placeholder="nama@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 relative z-10">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Secret Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00f0ff] transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 rounded-xl py-3.5 pl-10 pr-4 text-white outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#00f0ff] to-[#00d8ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.02] text-black font-black py-4 px-4 rounded-xl transition-all duration-300 mt-6 flex justify-center items-center gap-2 uppercase tracking-widest text-sm relative z-10"
                    >
                        {loading ? 'Mengautentikasi...' : 'Masuk ke Dashboard'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
