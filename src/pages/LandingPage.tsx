import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import BackgroundParticles from '../../components/BackgroundParticles';
import Hero from '../../components/Hero';
import About from '../../components/About';
import TeamLogos from '../../components/TeamLogos';
import Prestasi from '../../components/Prestasi';
import Events from '../../components/Events';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import SupportModal from '../../components/SupportModal';
import { initScrollTransitions } from '../../utils/scrollTransitions';

export const LandingPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    useEffect(() => {
        // Simulate loading time for the intro animation
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Initialize scroll transitions after component mounts
        const cleanup = initScrollTransitions();
        return cleanup;
    }, [loading]);

    return (
        <>
            {loading && <Loader />}

            <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 invisible' : 'opacity-100 visible'} bg-black text-white min-h-screen`}>
                <BackgroundParticles />
                <Navbar onOpenSupport={() => setIsSupportModalOpen(true)} />

                <main className="relative z-10">
                    <Hero />
                    <About />
                    <Prestasi />
                    <Events />
                    <Contact onOpenSupport={() => setIsSupportModalOpen(true)} />
                </main>

                <Footer />
                <ScrollToTop />
                <SupportModal 
                    isOpen={isSupportModalOpen} 
                    onClose={() => setIsSupportModalOpen(false)} 
                />
            </div>
        </>
    );
};
