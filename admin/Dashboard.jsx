import { useMemo } from 'react'
import { useOrderHistoryStore } from '../src/orders/orderHistoryStore.js'
import { formatETB } from '../src/utils/formatCurrency.js'

export default function Dashboard() {
  const orders = useOrderHistoryStore((s) => s.orders)

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + o.total + o.deliveryFee, 0)
    const orderCount = orders.length
    const avgOrder = orderCount > 0 ? revenue / orderCount : 0

    const dishCounts = {}
    orders.forEach((o) => {
      o.items.forEach((item) => {
        dishCounts[item.name] = (dishCounts[item.name] || 0) + item.qty
      })
    })
    const topDishes = Object.entries(dishCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const statusCounts = {}
    orders.forEach((o) => {
      const status = o.status || 'pending'
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    return { revenue, orderCount, avgOrder, topDishes, statusCounts }
  }, [orders])

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Revenue</span>
          <span className="stat-value">{formatETB(stats.revenue)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Orders</span>
          <span className="stat-value">{stats.orderCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg. order value</span>
          <span className="stat-value">{formatETB(stats.avgOrder)}</span>
        </div>
      </div>

      <h2>Top selling dishes</h2>
      {stats.topDishes.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ol>
          {stats.topDishes.map(([name, qty]) => (
            <li key={name}>
              {name} — {qty} sold
            </li>
          ))}
        </ol>
      )}

      <h2>Order status breakdown</h2>
      {Object.keys(stats.statusCounts).length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
          {Object.entries(stats.statusCounts).map(([status, count]) => (
            <li key={status}>
              <span className={`status-pill status-${status}`}>{status}</span>{' '}
              {count}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
