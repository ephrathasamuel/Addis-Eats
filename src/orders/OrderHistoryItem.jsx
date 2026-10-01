import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../cart/cartStore.js'
import { formatETB } from '../utils/formatCurrency.js'
import Button from '../ui/Button.jsx'

export default function OrderHistoryItem({ order }) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  function handleReorder() {
    order.items.forEach((item) => addItem(item, item.qty))
    navigate('/cart')
  }

  return (
    <div className="order-card">
      <div className="order-head">
        <strong>{new Date(order.placedAt).toLocaleString()}</strong>
        <span>{formatETB(order.total + order.deliveryFee)}</span>
      </div>
      <ul style={{ margin: '0 0 0.75rem', paddingLeft: '1.1rem' }}>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.qty} × {item.name}
          </li>
        ))}
      </ul>
      <p style={{ margin: '0 0 0.75rem', opacity: 0.75 }}>
        Delivered to {order.area}
      </p>
      <Button variant="secondary" onClick={handleReorder}>
        Reorder
      </Button>
    </div>
  )
}
