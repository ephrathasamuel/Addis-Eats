import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext.jsx'

export default function RequireAdmin({ children }) {
  const { admin } = useAdminAuth()
  const location = useLocation()

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
