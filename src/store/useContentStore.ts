import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface ContentState {
    hero: {
        titleText1: string;
        titleText2: string;
        description: string;
    };
    loading: boolean;
    fetchContent: () => Promise<void>;
    updateHeroContent: (newHeroData: Partial<ContentState['hero']>) => Promise<void>;
}

const defaultContent = {
    hero: {
        titleText1: "BRAWIJAYA",
        titleText2: "ESPORT",
        description: "Unit Kegiatan Mahasiswa (UKM) Brawijaya E-Sport (BEST) adalah komunitas e-sports di Universitas Brawijaya. Sejak 2021, kami mewadahi 800+ anggota dan membina tim kompetitif (MLBB, HOK, PUBGM, Valorant) untuk berprestasi di tingkat nasional dengan menjunjung tinggi sportivitas."
    }
};

export const useContentStore = create<ContentState>((set, get) => ({
    hero: defaultContent.hero,
    loading: false,

    fetchContent: async () => {
        set({ loading: true });
        try {
            const docRef = doc(db, 'websiteContent', 'home');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                set({ hero: data.hero || defaultContent.hero });
            } else {
                // Document doesn't exist, create it with default content
                await setDoc(docRef, defaultContent);
                set({ hero: defaultContent.hero });
            }
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            set({ loading: false });
        }
    },

    updateHeroContent: async (newHeroData) => {
        const currentHero = get().hero;
        const updatedHero = { ...currentHero, ...newHeroData };

        // Optimistic UI Update
        set({ hero: updatedHero });

        try {
            const docRef = doc(db, 'websiteContent', 'home');
            await setDoc(docRef, { hero: updatedHero }, { merge: true });
        } catch (error) {
            console.error("Error updating content:", error);
            // Revert if failed
            set({ hero: currentHero });
            throw error;
        }
    }
}));
