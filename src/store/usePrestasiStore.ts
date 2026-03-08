import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface PrestasiItem {
    id: string;
    src: string;
    title: string;
    desc: string;
}

interface PrestasiState {
    prestasiList: PrestasiItem[];
    loading: boolean;
    fetchPrestasi: () => Promise<void>;
    updatePrestasiList: (newList: PrestasiItem[]) => Promise<void>;
    uploadPrestasiImage: (file: File) => Promise<string>;
}

export const usePrestasiStore = create<PrestasiState>((set, get) => ({
    prestasiList: [],
    loading: false,

    fetchPrestasi: async () => {
        set({ loading: true });
        try {
            const docRef = doc(db, 'websiteContent', 'prestasi');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                set({ prestasiList: data.items || [] });
            } else {
                // Fallback: load from static JSON the first time
                try {
                    const response = await fetch('/data/prestasi.json');
                    if (response.ok) {
                        const defaultData: PrestasiItem[] = await response.json();
                        const dataWithIds = defaultData.map((item, i) => ({ ...item, id: `static-${i}` }));
                        await setDoc(docRef, { items: dataWithIds });
                        set({ prestasiList: dataWithIds });
                        return;
                    }
                } catch (e) {
                    console.warn("Failed loading fallback JSON, using empty list");
                }
                set({ prestasiList: [] });
            }
        } catch (error) {
            console.error("Error fetching prestasi:", error);
        } finally {
            set({ loading: false });
        }
    },

    updatePrestasiList: async (newList) => {
        const currentList = get().prestasiList;
        set({ prestasiList: newList });
        try {
            const docRef = doc(db, 'websiteContent', 'prestasi');
            await setDoc(docRef, { items: newList });
        } catch (error) {
            console.error("Error updating prestasi list:", error);
            set({ prestasiList: currentList });
            throw error;
        }
    },

    uploadPrestasiImage: async (file) => {
        return new Promise((resolve, reject) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `prestasi/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                () => { },
                (error) => reject(error),
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    }
}));
