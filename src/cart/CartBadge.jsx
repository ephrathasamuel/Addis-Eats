import { Link } from 'react-router-dom'
import { useCartStore } from './cartStore.js'

export default function CartBadge() {
  const count = useCartStore((s) => s.getCount())

  return (
    <Link to="/cart" className="nav-link" aria-label={`Cart, ${count} items`}>
      Cart{count > 0 && <span className="badge">{count}</span>}
    </Link>
  )
}
