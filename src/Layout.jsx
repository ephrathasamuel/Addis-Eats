import { NavLink, Outlet } from 'react-router-dom'
import CartBadge from './cart/CartBadge.jsx'
import ThemeToggle from './theme/ThemeToggle.jsx'
import { useAuth } from './auth/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function link({ isActive }) {
  return `nav-link ${isActive ? 'active' : ''}`
}

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <NavLink to="/" className="brand" end>
            Addis Eats
          </NavLink>
          <NavLink to="/menu" className={link}>
            Menu
          </NavLink>
          <NavLink to="/favorites" className={link}>
            Favorites
          </NavLink>
          <NavLink to="/orders" className={link}>
            Orders
          </NavLink>
          <CartBadge />
          <ThemeToggle />
          {!user ? (
            <NavLink to="/signin" className={link}>
              Sign in
            </NavLink>
          ) : (
            <NavLink to="/profile" className={link}>
              {user.name}
            </NavLink>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
