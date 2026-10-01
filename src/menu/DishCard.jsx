import { Link } from 'react-router-dom'
import FavoriteButton from '../favorites/FavoriteButton.jsx'
import { formatETB } from '../utils/formatCurrency.js'

export default function DishCard({ dish }) {
  const content = (
    <>
      <img
        src={dish.image}
        alt={dish.name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = 'https://via.placeholder.com/600?text=Image+not+available'
        }}
      />
      <FavoriteButton dishId={dish.id} className="favorite-toggle" />
      <div className="dish-card-body">
        {dish.special && <span className="special-badge">Today's special</span>}
        <span className="dish-name">{dish.name}</span>
        <p className="dish-desc">{dish.description}</p>
        <span className="dish-price">{formatETB(dish.price)}</span>
      </div>
      {dish.soldOut && <div className="sold-overlay">Sold out</div>}
    </>
  )

  if (dish.soldOut) {
    return (
      <div className="dish-card sold-out" aria-hidden>
        {content}
      </div>
    )
  }

  return (
    <Link to={`/menu/${dish.id}`} className="dish-card">
      {content}
    </Link>
  )
}
