import { Link } from 'react-router-dom'
import { useFavoritesStore } from './favoritesStore.js'
import { useFetch } from '../hooks/useFetch.js'
import { getDishes } from '../api/dishes.js'
import Spinner from '../ui/Spinner.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import DishList from '../menu/DishList.jsx'
import Button from '../ui/Button.jsx'

export default function Favorites() {
  const favoriteIds = useFavoritesStore((s) => s.ids)
  const { data: dishes, loading, error } = useFetch(getDishes, [])

  const favoriteDishes = (dishes || []).filter((d) => favoriteIds.includes(d.id))

  return (
    <div className="container">
      <h1 className="page-title">Favorites</h1>
      {loading && <Spinner label="Loading your favorites…" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && favoriteIds.length === 0 && (
        <EmptyState
          title="No favorites yet. Tap the heart on a dish to save it."
          action={
            <Link to="/menu">
              <Button>Browse the menu</Button>
            </Link>
          }
        />
      )}
      {!loading && !error && favoriteIds.length > 0 && (
        <DishList dishes={favoriteDishes} />
      )}
    </div>
  )
}
