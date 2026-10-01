import { Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import { formatETB } from '../utils/formatCurrency.js'

export default function Confirmation({ order }) {
  return (
    <div className="container" style={{ maxWidth: 480, textAlign: 'center' }}>
      <h1 className="page-title">Order placed 🎉</h1>
      <p>
        Thanks, {order.name}. Your order is on its way to {order.area} and
        should arrive in about {order.etaMinutes} minutes.
      </p>
      <p style={{ fontWeight: 700 }}>
        Total charged: {formatETB(order.total + order.deliveryFee)}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <Link to="/orders">
          <Button variant="secondary">View order history</Button>
        </Link>
        <Link to="/menu">
          <Button>Order more</Button>
        </Link>
      </div>
    </div>
  )
}
