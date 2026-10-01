import { Link } from 'react-router-dom'
import { useOrderHistoryStore } from './orderHistoryStore.js'
import OrderHistoryItem from './OrderHistoryItem.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Button from '../ui/Button.jsx'

export default function OrderHistory() {
  const orders = useOrderHistoryStore((s) => s.orders)

  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h1 className="page-title">Order history</h1>
      {orders.length === 0 ? (
        <EmptyState
          title="You haven't placed any orders yet."
          action={
            <Link to="/menu">
              <Button>Browse the menu</Button>
            </Link>
          }
        />
      ) : (
        orders.map((order) => <OrderHistoryItem key={order.id} order={order} />)
      )}
    </div>
  )
}
