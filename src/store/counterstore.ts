import { create } from 'zustand';

// Define the state type
interface CounterState {
  count: number;

  users_email_id: string;
  users_id: string;

  increment: () => void;
  decrement: () => void;
  reset: () => void;
  image_coming_from_BE: string[];
  image_to_show_in_modal_list: (url: string) => void;
}

// Create the store
const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  image_coming_from_BE: [],
  users_email_id: "abc@gmail.com",
  users_id: "7",

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  image_to_show_in_modal_list: (url) => set((state) => ({ image_coming_from_BE: [...state.image_coming_from_BE, url], })),

}));

export default useCounterStore;
