import { create } from "zustand";

// Define the state type
interface CounterState {
  count: number;
  users_email_id: string;
  users_id: string;
  credit: number;
  image_coming_from_BE: string[];
  creditFetchError: null | string;
  loadingCredits: boolean;

  increment: () => void;
  decrement: () => void;
  reset: () => void;
  image_to_show_in_modal_list: (url: string) => void;
  get_user_credits: (userId: string) => Promise<void>;
}

interface CreditResponse {
  credit: number;
}

// Create the store
const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  image_coming_from_BE: [],
  users_email_id: "abc@gmail.com",
  users_id: "01f90e3d-171d-4313-8985-f25ccd5cd915",
  credit: 0,
  creditFetchError: null,
  loadingCredits: false,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  image_to_show_in_modal_list: (url) =>
    set((state) => ({
      image_coming_from_BE: [...state.image_coming_from_BE, url],
    })),
  get_user_credits: async (users_id) => {
    set({ loadingCredits: true, creditFetchError: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${users_id}/credit`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: CreditResponse = await response.json();
      set({ credit: data.credit, loadingCredits: false });
    } catch (error: any) {
      set({ loadingCredits: false, creditFetchError: error.message });
    }
  },
}));

export default useCounterStore;
