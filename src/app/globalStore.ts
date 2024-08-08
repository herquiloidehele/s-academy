import create from "zustand";

interface GlobalStoreState {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGlobalStore = create<GlobalStoreState>((set) => ({
  loading: false,
  error: null,
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
