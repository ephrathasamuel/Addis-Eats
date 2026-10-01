import DishCard from './DishCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <EmptyState title="No dishes match your search." />
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  )
}
