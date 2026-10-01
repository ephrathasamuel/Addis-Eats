import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { getDishById } from '../api/dishes.js'
import { useCartStore } from '../cart/cartStore.js'
import { formatETB } from '../utils/formatCurrency.js'
import FavoriteButton from '../favorites/FavoriteButton.jsx'
import Spinner from '../ui/Spinner.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import Button from '../ui/Button.jsx'

export default function Dish() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: dish, loading, error } = useFetch(() => getDishById(id), [id])
  const addItem = useCartStore((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)

  if (loading) return <Spinner label="Loading dish…" />
  if (error) return <ErrorMessage message={error} />
  if (!dish) return null

  function handleAddToCart() {
    addItem(dish, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="container">
      <Link to="/menu" className="nav-link">
        ← Back to menu
      </Link>
      <div className="dish-detail" style={{ marginTop: '1.5rem' }}>
        <img src={dish.image} alt={dish.name} />
        <div>
          {dish.special && <span className="special-badge">Today's special</span>}
          <h1 style={{ marginTop: '0.5rem' }}>
            {dish.name}{' '}
            <FavoriteButton dishId={dish.id} />
          </h1>
          <p style={{ opacity: 0.8 }}>{dish.description}</p>
          <p className="dish-price" style={{ fontSize: '1.4rem' }}>
            {formatETB(dish.price)}
          </p>
          <Button onClick={handleAddToCart}>
            {justAdded ? 'Added ✓' : 'Add to cart'}
          </Button>{' '}
          <Button variant="secondary" onClick={() => navigate('/cart')}>
            Go to cart
          </Button>
        </div>
      </div>
    </div>
  )
}
