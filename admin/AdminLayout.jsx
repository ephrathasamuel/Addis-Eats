import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext.jsx'
import Button from '../src/ui/Button.jsx'
import './admin.css'

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Addis Eats Admin</div>
        <nav aria-label="Admin navigation">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/menu">Menu</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <span>Signed in as {admin?.username}</span>
          <Button
            variant="secondary"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Log out
          </Button>
        </div>
      </aside>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}
