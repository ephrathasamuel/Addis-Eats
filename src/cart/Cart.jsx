import { Link } from 'react-router-dom'
import { useCartStore } from './cartStore.js'
import CartLine from './CartLine.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Button from '../ui/Button.jsx'
import { formatETB } from '../utils/formatCurrency.js'

export default function Cart() {
  const items = useCartStore((s) => s.items)
  const getTotal = useCartStore((s) => s.getTotal)

  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h1 className="page-title">Your cart</h1>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty."
          action={
            <Link to="/menu">
              <Button>Browse the menu</Button>
            </Link>
          }
        />
      ) : (
        <>
          {items.map((item) => (
            <CartLine key={item.id} item={item} />
          ))}
          <div className="cart-total-row">
            <span>Total</span>
            <span>{formatETB(getTotal())}</span>
          </div>
          <Link to="/checkout">
            <Button>Proceed to checkout</Button>
          </Link>
        </>
      )}
    </div>
  )
}
