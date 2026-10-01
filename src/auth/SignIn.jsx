import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import Button from '../ui/Button.jsx'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const ok = signIn(name.trim(), password)
    if (ok) {
      navigate(from, { replace: true })
    } else {
      setError('Please enter a name and password.')
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2 className="page-title">Sign in to check out</h2>
      <p>Checkout is only available once you're signed in.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="signin-name">Your name</label>
          <input
            id="signin-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Selam"
            autoFocus
          />
        </div>
        <div className="form-field">
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <Button type="submit">Sign in</Button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>Are you an admin?</p>
        <Button variant="secondary" onClick={() => navigate('/admin/login')}>
          Admin sign in
        </Button>
      </div>
    </div>
  )
}
