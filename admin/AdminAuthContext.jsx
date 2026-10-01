import { createContext, useContext, useEffect, useState } from 'react'

const AdminAuthContext = createContext(null)
const SESSION_KEY = 'addis-eats-admin-session'


const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = sessionStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (admin) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(admin))
    } else {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [admin])

  function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdmin({ username })
      return true
    }
    return false
  }

  function logout() {
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
