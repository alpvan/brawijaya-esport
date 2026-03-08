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
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-[#00f0ff]/10 rounded-full flex items-center justify-center mb-4 border border-[#00f0ff]/30">
                        <LayoutDashboard className="w-8 h-8 text-[#00f0ff]" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-gray-400 text-sm text-center">Login untuk mengelola konten website Brawijaya Esport</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff] rounded-lg py-3 pl-10 pr-4 text-white outline-none transition-colors"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f0ff] rounded-lg py-3 pl-10 pr-4 text-white outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00f0ff] hover:bg-[#00c0cc] text-black font-bold py-3 px-4 rounded-lg transition-colors mt-6 flex justify-center items-center gap-2"
                    >
                        {loading ? 'Memproses...' : 'Login ke Dashboard'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
