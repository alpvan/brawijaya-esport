import { create } from 'zustand';
import { collection, getDocs, addDoc, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export interface RegistrantItem {
    id: string;
    eventName: string;
    namaLengkap: string;
    nim: string;
    fakultas: string;
    telepon: string;
    instagram: string;
    timestamp: any;
}

interface RegistrantsState {
    registrantsList: RegistrantItem[];
    loading: boolean;
    fetchRegistrants: () => Promise<void>;
    addRegistrant: (data: Omit<RegistrantItem, 'id' | 'timestamp'>) => Promise<void>;
    clearRegistrants: () => Promise<void>;
}

export const useRegistrantsStore = create<RegistrantsState>((set) => ({
    registrantsList: [],
    loading: false,

    fetchRegistrants: async () => {
        set({ loading: true });
        try {
            const q = query(collection(db, 'registrants'), orderBy('timestamp', 'desc'));
            const snapshot = await getDocs(q);
            const list: RegistrantItem[] = [];
            snapshot.forEach((d) => {
                list.push({ id: d.id, ...d.data() } as RegistrantItem);
            });
            set({ registrantsList: list });
        } catch (error) {
            console.error('Error fetching registrants:', error);
        } finally {
            set({ loading: false });
        }
    },

    addRegistrant: async (data) => {
        const newEntry = { ...data, timestamp: new Date() };
        try {
            const docRef = await addDoc(collection(db, 'registrants'), newEntry);
            set((state) => ({
                registrantsList: [
                    { id: docRef.id, ...newEntry },
                    ...state.registrantsList,
                ],
            }));
        } catch (error) {
            console.error('Error adding registrant:', error);
            throw error;
        }
    },

    clearRegistrants: async () => {
        set({ loading: true });
        try {
            const q = query(collection(db, 'registrants'));
            const snapshot = await getDocs(q);
            
            // Delete all documents in parallel
            const deletePromises = snapshot.docs.map(document => 
                deleteDoc(doc(db, 'registrants', document.id))
            );
            await Promise.all(deletePromises);

            set({ registrantsList: [] });
        } catch (error) {
            console.error('Error clearing registrants:', error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },
}));
