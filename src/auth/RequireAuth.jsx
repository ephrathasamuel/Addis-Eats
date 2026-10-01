import { useAuth } from './AuthContext.jsx'
import { Navigate, useLocation } from 'react-router-dom'

// Guards /checkout: redirect to the sign-in page and preserve the
// attempted location so users return to checkout after signing in.
export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />
  return children
}
