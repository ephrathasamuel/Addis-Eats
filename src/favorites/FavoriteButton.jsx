import { useFavoritesStore } from './favoritesStore.js'

export default function FavoriteButton({ dishId, className = '' }) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(dishId))
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)

  return (
    <button
      className={`icon-btn ${className}`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(dishId)
      }}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  )
}
