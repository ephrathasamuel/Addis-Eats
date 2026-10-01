import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Appended to after a successful checkout; read by the Order History
// page and by "Reorder" (which re-adds an order's items to the cart).
export const useOrderHistoryStore = create(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [
            {
              id: `o${Date.now()}`,
              placedAt: new Date().toISOString(),
              ...order,
            },
            ...state.orders,
          ],
        })),
    }),
    { name: 'addis-eats-orders' }
  )
)
