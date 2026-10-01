import { useAuth } from '../auth/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import { useOrderHistoryStore } from '../orders/orderHistoryStore.js'
import OrderHistoryItem from '../orders/OrderHistoryItem.jsx'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const orders = useOrderHistoryStore((s) => s.orders)

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <div className="container" style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', minHeight: '60vh' }}>
      <div>
        <h1 className="page-title">{user?.name}</h1>
        <h2 style={{ fontSize: '1rem', marginTop: 8, opacity: 0.8 }}>Order history</h2>

        {orders.length === 0 ? (
          <p style={{ marginTop: '0.5rem' }}>You have no orders yet.</p>
        ) : (
          <div style={{ marginTop: '0.5rem', display: 'grid', gap: '0.75rem' }}>
            {orders.map((o) => (
              <OrderHistoryItem key={o.id} order={o} />
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    </div>
  )
}
