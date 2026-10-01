import { create } from 'zustand'
import { getDishes } from './dishes.js'


export const useDishStore = create((set, get) => ({
  dishes: [],

  seedIfNeeded: async () => {
    const current = get().dishes
    if (current && current.length > 0) return
    try {
      const data = await getDishes()
      set({ dishes: data })
    } catch (e) {
      // ignore seed errors in admin
      set({ dishes: [] })
    }
  },

  addDish: (dish) =>
    set((state) => ({
      dishes: [
        { id: `d${Date.now()}`, ...dish },
        ...state.dishes,
      ],
    })),

  updateDish: (id, patch) =>
    set((state) => ({
      dishes: state.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    })),

  deleteDish: (id) =>
    set((state) => ({ dishes: state.dishes.filter((d) => d.id !== id) })),
}))
