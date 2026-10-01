import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext.jsx'
import Button from '../src/ui/Button.jsx'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/admin'

  function handleSubmit(e) {
    e.preventDefault()
    const ok = login(username.trim(), password)
    if (ok) {
      navigate(from, { replace: true })
    } else {
      setError('Incorrect username or password.')
    }
  }

  return (
    <div className="container" style={{ maxWidth: 380, paddingTop: '3rem' }}>
      <h1 className="page-title">Admin sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <Button type="submit">Sign in</Button>
      </form>
      <p style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.85rem' }}>
        Demo credentials — username <code>admin</code>, password{' '}
        <code>admin123</code>.
      </p>
    </div>
  )
}
