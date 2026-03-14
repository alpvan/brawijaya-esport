import { create } from 'zustand';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface FormField {
    key: string;
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
    options?: string[];
}

export interface DetailCard {
    id: string;
    label: string;
    value: string;
    icon: string; // 'clock' | 'users' | 'trophy' | 'mappin' | 'briefcase' | 'star' | 'zap' | 'gift'
}

export interface EventItem {
    id: string;
    title: string;
    desc: string;
    date: string;
    month: string;
    active: boolean;
    tag?: string;
    btn?: string;
    location?: string;
    time?: string;
    content?: string;
    image?: string;
    formFields?: FormField[];
    successTitle?: string;
    successMessage?: string;
    externalLink?: string;
    // Customizable detail cards for the "Pelajari Lebih Lanjut" modal
    detailCards?: DetailCard[];
}

interface EventsState {
    eventsList: EventItem[];
    loading: boolean;
    fetchEvents: () => Promise<void>;
    addEvent: (newEvent: Omit<EventItem, 'id' | 'formFields' | 'successTitle' | 'successMessage'>) => Promise<void>;
    updateEvent: (id: string, updatedEvent: Partial<EventItem>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
}

export const useEventsStore = create<EventsState>((set, get) => ({
    eventsList: [],
    loading: false,

    fetchEvents: async () => {
        set({ loading: true });
        try {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const events: EventItem[] = [];
            querySnapshot.forEach((d) => {
                events.push({ id: d.id, ...d.data() } as EventItem);
            });

            if (events.length === 0) {
                // Fallback: migrate static events.json to Firestore the first time
                try {
                    const response = await fetch('/data/events.json');
                    if (response.ok) {
                        const defaultEvents = await response.json();
                        const migrated: EventItem[] = [];
                        for (const ev of defaultEvents) {
                            const { id: _id, ...rest } = ev;
                            const docRef = await addDoc(collection(db, 'events'), rest);
                            migrated.push({ id: docRef.id, ...rest });
                        }
                        set({ eventsList: migrated });
                        return;
                    }
                } catch (e) {
                    console.warn("Failed loading fallback events JSON");
                }
            }

            set({ eventsList: events });
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            set({ loading: false });
        }
    },

    addEvent: async (newEventData) => {
        try {
            const newEvent = {
                ...newEventData,
                formFields: [
                    { key: 'namaLengkap', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap Anda', type: 'text', required: true },
                    { key: 'nim', label: 'NIM', placeholder: 'mis. 215150...', type: 'text', required: true },
                    { key: 'fakultas', label: 'Fakultas', placeholder: 'mis. Filkom', type: 'text', required: true },
                    { key: 'telepon', label: 'Nomor Telepon / WA', placeholder: 'mis. 08123456789', type: 'tel', required: true },
                    { key: 'instagram', label: 'Instagram', placeholder: '@username', type: 'text', required: true },
                ],
                successTitle: 'Pendaftaran Berhasil!',
                successMessage: 'Anda telah berhasil mendaftar. Kami akan menghubungi Anda melalui WhatsApp atau Instagram segera.',
            };
            const docRef = await addDoc(collection(db, 'events'), newEvent);
            set((state) => ({
                eventsList: [...state.eventsList, { id: docRef.id, ...newEvent }],
            }));
        } catch (error) {
            console.error("Error adding event:", error);
            throw error;
        }
    },

    updateEvent: async (id, updatedEvent) => {
        const prevList = get().eventsList;
        set((state) => ({
            eventsList: state.eventsList.map((e) => (e.id === id ? { ...e, ...updatedEvent } : e)),
        }));
        try {
            const docRef = doc(db, 'events', id);
            await updateDoc(docRef, updatedEvent);
        } catch (error) {
            console.error("Error updating event:", error);
            set({ eventsList: prevList });
            throw error;
        }
    },

    deleteEvent: async (id) => {
        const prevList = get().eventsList;
        set((state) => ({
            eventsList: state.eventsList.filter((e) => e.id !== id),
        }));
        try {
            await deleteDoc(doc(db, 'events', id));
        } catch (error) {
            console.error("Error deleting event:", error);
            set({ eventsList: prevList });
            throw error;
        }
    },
}));
