import { create } from "zustand";

const saved = JSON.parse(localStorage.getItem("transactions")) || [];

export const useStore = create((set, get) => ({
  transactions: saved,
  role: "admin",

  setRole: (role) => set({ role }),

  addTransaction: (t) => {
    const updated = [...get().transactions, { ...t, id: Date.now() }];
    localStorage.setItem("transactions", JSON.stringify(updated));
    set({ transactions: updated });
  },

  deleteTransaction: (id) => {
    const updated = get().transactions.filter((t) => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(updated));
    set({ transactions: updated });
  },
}));