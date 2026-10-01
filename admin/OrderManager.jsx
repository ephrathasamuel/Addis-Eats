import { Fragment, useState } from 'react'
import { useOrderHistoryStore } from '../src/orders/orderHistoryStore.js'
import { formatETB } from '../src/utils/formatCurrency.js'
import Button from '../src/ui/Button.jsx'

const STATUSES = ['pending', 'preparing', 'delivering', 'delivered']

export default function OrderManager() {
  const orders = useOrderHistoryStore((s) => s.orders)
  const updateOrderStatus = useOrderHistoryStore((s) => s.updateOrderStatus)
  const deleteOrder = useOrderHistoryStore((s) => s.deleteOrder)

  const [expandedId, setExpandedId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="page-title">Orders</h1>
        <p>No orders have been placed yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Orders</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Placed</th>
            <th>Customer</th>
            <th>Area</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Fragment key={order.id}>
              <tr>
                <td>{new Date(order.placedAt).toLocaleString()}</td>
                <td>{order.name}</td>
                <td>{order.area}</td>
                <td>{formatETB(order.total + order.deliveryFee)}</td>
                <td>
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    aria-label={`Status for order placed ${order.placedAt}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="admin-row-actions">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setExpandedId(expandedId === order.id ? null : order.id)
                    }
                  >
                    {expandedId === order.id ? 'Hide' : 'Details'}
                  </Button>
                  {confirmDeleteId === order.id ? (
                    <>
                      <Button
                        onClick={() => {
                          deleteOrder(order.id)
                          setConfirmDeleteId(null)
                        }}
                      >
                        Confirm
                      </Button>
                      <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="secondary" onClick={() => setConfirmDeleteId(order.id)}>
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
              {expandedId === order.id && (
                <tr>
                  <td colSpan={6}>
                    <div className="order-details">
                      <p>Phone: {order.phone}</p>
                      {order.instructions && <p>Notes: {order.instructions}</p>}
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.qty} × {item.name} —{' '}
                            {formatETB(item.price * item.qty)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
