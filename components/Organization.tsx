import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Reveal from './Reveal';
import MemberCard from './MemberCard';
import TextScramble from './TextScramble';

import GlitchReveal from './GlitchReveal';

// Helper to generate  data
const generate = (division: string, count: number, startIdx = 1) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `${division} Member ${startIdx + i}`,
        role: `${division} `,
        division: division,
        color: "from-blue-500 to-cyan-500" // Default color
    }));
};

// Data Definition
const memberPhotoPath = "/brawijaya-esport/anggota/Alvan.png";

const ORGANIZATION_DATA: Record<string, { name: string; role: string; division: string; color: string; image?: string }[]> = {
    BPI: [
        { name: "Abiyasa Satria Lintang Perkasa", role: "KETUA UMUM", division: "BPI", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Ismail Hamzah Manaf", role: "SEKRETARIS 1", division: "BPI", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Muhammad Alvan Javierul Haq", role: "SEKRETARIS 2", division: "BPI", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Nerisa Dewi Arvianti", role: "BENDAHARA", division: "BPI", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Fanti Dwi Amawati", role: "WAKIL KETUA 1", division: "BPI", color: "from-purple-500 to-pink-500", image: memberPhotoPath },
        { name: "Imelda Ikhfi Rahmadanti", role: "WAKIL KETUA 2", division: "BPI", color: "from-orange-500 to-red-500", image: memberPhotoPath },
        { name: "Muhammad Ronaa Setyoni Putra", role: "WAKIL KETUA 3", division: "BPI", color: "from-cyan-500 to-blue-600", image: memberPhotoPath },
        { name: "Rananda Ardiawan", role: "COMMUNITY DIRECTOR", division: "BPI", color: "from-purple-400 to-pink-400", image: memberPhotoPath },
        { name: "Ki Bagus Kusuma Adjinegara", role: "INTERNAL DIRECTOR", division: "BPI", color: "from-orange-400 to-red-400", image: memberPhotoPath },
    ],
    HRD: [
        { name: "Muhammad Hilmii Saliim", role: "HRD ", division: "HRD", color: "from-orange-400 to-red-400", image: memberPhotoPath },
        { name: "Danish Abdurochman", role: "HRD ", division: "HRD", color: "from-orange-400 to-red-400", image: memberPhotoPath },
        { name: "Muhammad Putra Abhinaya", role: "HRD ", division: "HRD", color: "from-orange-400 to-red-400", image: memberPhotoPath },
        { name: "Azzahra Shafa As'adiyati", role: "HRD ", division: "HRD", color: "from-orange-400 to-red-400", image: memberPhotoPath },
    ],
    MLBB: [
        { name: "Adib Insanul Godi", role: "MLBB ", division: "MLBB", color: "from-purple-400 to-pink-400", image: memberPhotoPath },
        { name: "Bimo Abi Umardhani", role: "MLBB ", division: "MLBB", color: "from-purple-400 to-pink-400", image: memberPhotoPath },
        { name: "Nabil Syabdwi Putra", role: "MLBB ", division: "MLBB", color: "from-purple-400 to-pink-400", image: memberPhotoPath },
        { name: "Hasna Yusra Najar", role: "MLBB ", division: "MLBB", color: "from-purple-400 to-pink-400", image: memberPhotoPath },
    ],
    PUBGM: [
        { name: "Kirania Dannah Roqhiibah", role: "PUBGM ", division: "PUBGM", color: "from-emerald-400 to-teal-500", image: memberPhotoPath },
        { name: "Ryan Putra Adivara", role: "PUBGM ", division: "PUBGM", color: "from-emerald-400 to-teal-500", image: memberPhotoPath },
    ],
    CM: [
        { name: "Anziela Awwaliya Atsya Rohmah", role: "CM ", division: "CM", color: "from-indigo-400 to-blue-500", image: memberPhotoPath },
        { name: "Muhammad Wisnu Hamdani", role: "CM ", division: "CM", color: "from-indigo-400 to-blue-500", image: memberPhotoPath },
        { name: "Syifa Amalia Hariyanti", role: "CM ", division: "CM", color: "from-indigo-400 to-blue-500", image: memberPhotoPath },
    ],
    MF: [
        { name: "Salsabila Nathania Azalia", role: "MF ", division: "MF", color: "from-pink-400 to-rose-500", image: memberPhotoPath },
        { name: "Akeyla Kiral Musyaffa Majid", role: "MF ", division: "MF", color: "from-pink-400 to-rose-500", image: memberPhotoPath },
        { name: "Dyfan Dzakirah Putra Risdyanto", role: "MF ", division: "MF", color: "from-pink-400 to-rose-500", image: memberPhotoPath },
    ],
    PR: [
        { name: "Nur Alfina Ramadhani", role: "PR ", division: "PR", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Muhammad Ilham David S", role: "PR ", division: "PR", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Fania Mutiara Felichia", role: "PR ", division: "PR", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
        { name: "Mohammad Arman Zaki", role: "PR ", division: "PR", color: "from-yellow-400 to-orange-500", image: memberPhotoPath },
    ],
    VALORANT: [
        { name: "Lintang Alfarani Atikafitra", role: "VALORANT ", division: "VALORANT", color: "from-red-400 to-rose-500", image: memberPhotoPath },
        { name: "Muhammad Fahmi Athanaya", role: "VALORANT ", division: "VALORANT", color: "from-red-400 to-rose-500", image: memberPhotoPath },
    ],
    HOK: [
        { name: "Tio Afandi", role: "HOK ", division: "HOK", color: "from-blue-400 to-cyan-500", image: memberPhotoPath },
        { name: "Bisma Putra Aria Wijaya", role: "HOK ", division: "HOK", color: "from-blue-400 to-cyan-500", image: memberPhotoPath },
    ],
    FE: [
        { name: "Muhammad Hakim Al Hasyir", role: "FE ", division: "FE", color: "from-orange-400 to-amber-500", image: memberPhotoPath },
        { name: "Muhammad Naufal Rizqiansyah", role: "FE ", division: "FE", color: "from-orange-400 to-amber-500", image: memberPhotoPath },
    ],
};

const TABS = Object.keys(ORGANIZATION_DATA);

const BPITreeLayout = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
    const getMember = (rolePart: string) => ORGANIZATION_DATA.BPI.find(m => m.role.includes(rolePart));

    const ketua = getMember("KETUA");
    const sek1 = getMember("SEKRETARIS 1");
    const sek2 = getMember("SEKRETARIS 2");
    const ben = getMember("BENDAHARA");
    const wakil1 = getMember("WAKIL KETUA 1");
    const wakil2 = getMember("WAKIL KETUA 2");
    const wakil3 = getMember("WAKIL KETUA 3");
    const cd = getMember("COMMUNITY DIRECTOR");
    const id = getMember("INTERNAL DIRECTOR");

    // Placeholder for Manager
    const manager = {
        name: "To Be Announced",
        role: "MANAGER",
        division: "Talent",
        color: "from-cyan-400 to-blue-500"
    };

    const lineVertical: Variants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "100%",
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const lineHorizontal: Variants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const goldLineClass = "bg-gray-300";
    const goldLineHorizClass = "bg-gray-300";

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="flex flex-col items-center min-w-[768px] md:min-w-full w-full max-w-7xl mx-auto p-4">

                {/* LEVEL 1: KETUA UMUM */}
                <div className="relative flex flex-col items-center mb-6">
                    <Reveal>
                        {ketua && <MemberCard {...ketua} />}
                    </Reveal>

                    {/* Vertical Line from Ketua down to horizontal bar */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-20 -z-10">
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className={`w-full h-full ${goldLineClass}`}
                        />
                    </div>
                </div>

                {/* LEVEL 2: SEKRETARIS & BENDAHARA */}
                <div className="relative w-full mb-12">

                    {/* Horizontal T-bar connecting all three cards */}
                    <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[85%] lg:w-[75%] h-1 -z-10">
                        <motion.div
                            variants={lineHorizontal}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                            className={`w-full h-full ${goldLineHorizClass}`}
                        />

                        {/* Vertical Riser to meet Ketua (Upwards) */}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 ${goldLineClass}`}></div>

                        {/* Vertical drops to each card - Extended to go behind cards */}
                        {/* Left drop (Sekretaris 1) */}
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.5 }}
                            className={`absolute top-0 left-[16.666%] -translate-x-1/2 w-px h-32 ${goldLineClass} -z-10`}
                        />

                        {/* Center drop (Sekretaris 2) */}
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.55 }}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 ${goldLineClass} -z-10`}
                        />

                        {/* Right drop (Bendahara) */}
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.6 }}
                            className={`absolute top-0 left-[83.333%] -translate-x-1/2 w-px h-32 ${goldLineClass} -z-10`}
                        />
                    </div>

                    {/* Three Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[85%] lg:w-[75%] mx-auto relative pt-12 z-20">
                        <Reveal delay={200}>
                            <div className="flex flex-col items-center relative">
                                {sek1 && <MemberCard {...sek1} />}
                                {/* Vertical line down from Sek1 to Level 3 */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-28 -z-10">
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.75 }}
                                        className={`w-full h-full ${goldLineClass}`}
                                    />
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={250}>
                            <div className="flex flex-col items-center relative">
                                {sek2 && <MemberCard {...sek2} />}

                                {/* Vertical line down from center Sekretaris to next level */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-28 -z-10">
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.75 }}
                                        className={`w-full h-full ${goldLineClass}`}
                                    />
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="flex flex-col items-center relative">
                                {ben && <MemberCard {...ben} />}
                                {/* Vertical line down from Ben to Level 3 */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-28 -z-10">
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.75 }}
                                        className={`w-full h-full ${goldLineClass}`}
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* LEVEL 3: WAKIL KETUA (3 positions) */}
                <div className="relative w-full mb-16">
                    {/* Horizontal T-bar connecting Wakil Ketua */}
                    <div className="hidden lg:block absolute -top-12 left-1/2 -translate-x-1/2 w-[90%] lg:w-[85%] h-1 z-0">
                        <motion.div
                            variants={lineHorizontal}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.9 }}
                            className={`w-full h-full ${goldLineHorizClass}`}
                        />

                        {/* Vertical Risers to meet Sek/Ben (Upwards) */}
                        <div className={`absolute bottom-0 left-[16.66%] -translate-x-1/2 w-1 h-16 ${goldLineClass}`}></div>
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 ${goldLineClass}`}></div>
                        <div className={`absolute bottom-0 left-[83.33%] -translate-x-1/2 w-1 h-16 ${goldLineClass}`}></div>

                        {/* Drops to cards with DOTS - Extended to go behind */}
                        <motion.div variants={lineVertical} initial="hidden" animate="visible" transition={{ delay: 1.0 }} className={`absolute top-0 left-[16.66%] -translate-x-1/2 w-1 h-32 ${goldLineClass}`} />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.15, duration: 0.3 }}
                            className="absolute bottom-2 left-[16.66%] -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-yellow-100 border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.8),0_0_25px_rgba(251,191,36,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] z-10 animate-pulse"
                        ></motion.div>

                        <motion.div variants={lineVertical} initial="hidden" animate="visible" transition={{ delay: 1.0 }} className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 ${goldLineClass}`} />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-yellow-100 border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.8),0_0_25px_rgba(251,191,36,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] z-10 animate-pulse"
                        ></motion.div>

                        <motion.div variants={lineVertical} initial="hidden" animate="visible" transition={{ delay: 1.0 }} className={`absolute top-0 left-[83.33%] -translate-x-1/2 w-1 h-32 ${goldLineClass}`} />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.25, duration: 0.3 }}
                            className="absolute bottom-2 left-[83.33%] -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-yellow-100 border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.8),0_0_25px_rgba(251,191,36,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] z-10 animate-pulse"
                        ></motion.div>
                    </div>

                    {/* Three Wakil Ketua Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[90%] lg:w-[85%] mx-auto relative z-20">
                        <Reveal delay={350}>
                            <div className="flex flex-col items-center relative">
                                {wakil1 && <MemberCard {...wakil1} />}
                                {/* Vertical line down from this Wakil */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 -z-10">
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.1 }}
                                        className={`w-full h-full ${goldLineClass}`}
                                    />
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={400}>
                            <div className="flex flex-col items-center relative">
                                {wakil2 && <MemberCard {...wakil2} />}
                                {/* Vertical line down from this Wakil */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 -z-10">
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.2 }}
                                        className={`w-full h-full ${goldLineClass}`}
                                    />
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={450}>
                            <div className="flex flex-col items-center relative">
                                {wakil3 && <MemberCard {...wakil3} />}
                                {/* Vertical line down from this Wakil */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 -z-10">
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.3 }}
                                        className={`w-full h-full ${goldLineClass}`}
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* LEVEL 4: DIRECTORS & MANAGER */}
                <div className="relative w-full mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[90%] lg:w-[85%] mx-auto">
                        {/* Community Director Column */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical line from Wakil 1 */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 -z-10">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.9 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>

                            <Reveal delay={600}>
                                {cd && <MemberCard {...cd} />}
                            </Reveal>
                        </div>

                        {/* Internal Director Column */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical line from Wakil 2 */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 -z-10">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.0 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>

                            <Reveal delay={700}>
                                {id && <MemberCard {...id} />}
                            </Reveal>
                        </div>

                        {/* Manager Column */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical line from Wakil 3 */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 -z-10">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.1 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>

                            <Reveal delay={800}>
                                <MemberCard {...manager} />
                            </Reveal>
                        </div>
                    </div>
                </div>

                {/* LEVEL 5: SUB-DIVISIONS */}
                <div className="relative w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-[90%] lg:w-[85%] mx-auto">

                        {/* COMMUNITY BRANCH - Horizontal layout */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical line down from CD */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 -z-10">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.3 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>

                            {/* Game divisions - Horizontal */}
                            <div className="flex flex-wrap justify-center gap-3 w-full pt-2">
                                {['MLBB', 'PUBGM', 'VALORANT', 'HOK', 'FE'].map((game, i) => (
                                    <motion.div
                                        key={game}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5 + (i * 0.1) }}
                                    >
                                        <div
                                            onClick={() => setActiveTab(game)}
                                            className="px-6 py-3 bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-yellow-600/10 border-2 border-yellow-500/40 rounded-lg text-sm font-black text-yellow-100 tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] min-w-[120px] text-center hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:border-yellow-400/60 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                        >
                                            {game}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* INTERNAL BRANCH - Horizontal layout */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical line down from ID */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 -z-10">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.3 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>

                            {/* Department divisions - Horizontal */}
                            <div className="flex flex-wrap justify-center gap-3 w-full pt-2">
                                {['PR', 'CM', 'MF', 'HRD'].map((dept, i) => (
                                    <motion.div
                                        key={dept}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5 + (i * 0.1) }}
                                    >
                                        <div
                                            onClick={() => setActiveTab(dept)}
                                            className="px-6 py-3 bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-yellow-600/10 border-2 border-yellow-500/40 rounded-lg text-sm font-black text-yellow-100 tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] min-w-[120px] text-center hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:border-yellow-400/60 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                        >
                                            {dept}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* TALENT BRANCH - Horizontal T-junction */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical line down from Manager */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 -z-10">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.3 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>

                            {/* Horizontal T-bar */}
                            <div className="absolute top-0 left-0 right-0 flex justify-center z-0">
                                <div className="relative h-1 w-full">
                                    <motion.div
                                        variants={lineHorizontal}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.4 }}
                                        className={`w-full h-full ${goldLineHorizClass}`}
                                    />

                                    {/* Three vertical drops */}
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.5 }}
                                        className={`absolute top-0 left-[16.666%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                                    />
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.5 }}
                                        className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                                    />
                                    <motion.div
                                        variants={lineVertical}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.5 }}
                                        className={`absolute top-0 left-[83.333%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                                    />
                                </div>
                            </div>

                            {/* Talent divisions */}
                            <div className="flex justify-between w-full gap-4 pt-10">
                                {['ATLET', 'CASTER', 'BA'].map((talent, i) => (
                                    <motion.div
                                        key={talent}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.6 + (i * 0.1) }}
                                        className="px-6 py-3 bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-yellow-600/10 border-2 border-yellow-500/40 rounded-lg text-sm font-black text-yellow-100 tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] text-center flex-1 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:border-yellow-400/60 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                    >
                                        {talent}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

const Organization: React.FC = () => {
    const [activeTab, setActiveTab] = useState('BPI');

    return (
        <section className="relative min-h-screen py-20 overflow-hidden bg-gray-50" id="organization">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16 px-4 select-none">
                        <GlitchReveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30 mx-auto">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-primary font-sans text-xs font-bold tracking-[0.15em] uppercase">
                                    Pengurus
                                </span>
                            </div>
                        </GlitchReveal>
                        <GlitchReveal>
                            <h3 className="text-3xl md:text-5xl font-sans font-black">
                                <span className="text-gray-900">Struktur </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500">
                                    <TextScramble text="Kepengurusan" />
                                </span>
                            </h3>
                        </GlitchReveal>
                    </div>
                </Reveal>

                {/* TAB NAVIGATION */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border ${activeTab === tab
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400 hover:text-orange-500'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID DISPLAY */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'BPI' ? (
                                <BPITreeLayout setActiveTab={setActiveTab} />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                                    {ORGANIZATION_DATA[activeTab].map((member, index) => (
                                        <Reveal key={index} delay={index * 100}>
                                            <MemberCard
                                                name={member.name}
                                                role={member.role}
                                                division={member.division}
                                                color={member.color}
                                            />
                                        </Reveal>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Organization;
