import { useCartStore } from './cartStore.js'
import { formatETB } from '../utils/formatCurrency.js'

export default function CartLine({ item }) {
  const increment = useCartStore((s) => s.incrementItem)
  const decrement = useCartStore((s) => s.decrementItem)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="cart-line">
      <img src={item.image} alt="" />
      <div className="name">
        <div>{item.name}</div>
        <small style={{ opacity: 0.7 }}>{formatETB(item.price)} each</small>
      </div>
      <div className="qty-controls">
        <button
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => decrement(item.id)}
        >
          −
        </button>
        <span aria-live="polite">{item.qty}</span>
        <button
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => increment(item.id)}
        >
          +
        </button>
      </div>
      <div style={{ minWidth: 80, textAlign: 'right' }}>
        {formatETB(item.price * item.qty)}
      </div>
      <button
        className="icon-btn"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => removeItem(item.id)}
      >
        ✕
      </button>
    </div>
  )
}
