import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Read by the heart icon on every DishCard and by the Favorites page.
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ids: [],

      toggleFavorite: (dishId) =>
        set((state) => ({
          ids: state.ids.includes(dishId)
            ? state.ids.filter((id) => id !== dishId)
            : [...state.ids, dishId],
        })),

      isFavorite: (dishId) => get().ids.includes(dishId),
    }),
    { name: 'addis-eats-favorites' }
  )
)
