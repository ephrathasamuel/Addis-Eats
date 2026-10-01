import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { id, name, price, image, qty, note }

      addItem: (dish, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === dish.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === dish.id ? { ...i, qty: i.qty + qty } : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                id: dish.id,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                qty,
              },
            ],
          }
        })
      },

      incrementItem: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        })),

      decrementItem: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),

      // Derived values — computed on demand, never stored redundantly.
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'addis-eats-cart' }
  )
)
