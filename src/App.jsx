import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import Layout from './Layout.jsx'
import Home from './home/Home.jsx'
import Menu from './menu/Menu.jsx'
import Dish from './menu/Dish.jsx'
import Cart from './cart/Cart.jsx'
import Checkout from './checkout/Checkout.jsx'
import Favorites from './favorites/Favorites.jsx'
import OrderHistory from './orders/OrderHistory.jsx'
import SignIn from './auth/SignIn.jsx'
import Profile from './profile/Profile.jsx'
// Admin area
import { AdminAuthProvider } from '../admin/AdminAuthContext.jsx'
import AdminLayout from '../admin/AdminLayout.jsx'
import AdminLogin from '../admin/AdminLogin.jsx'
import RequireAdmin from '../admin/RequireAdmin.jsx'
import Dashboard from '../admin/Dashboard.jsx'
import DishManager from '../admin/DishManager.jsx'
import OrderManager from '../admin/OrderManager.jsx'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:id" element={<Dish />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Route>

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <AdminAuthProvider>
                  <AdminLayout />
                </AdminAuthProvider>
              }
            >
              <Route path="login" element={<AdminLogin />} />
              <Route
                index
                element={
                  <RequireAdmin>
                    <Dashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="menu"
                element={
                  <RequireAdmin>
                    <DishManager />
                  </RequireAdmin>
                }
              />
              <Route
                path="orders"
                element={
                  <RequireAdmin>
                    <OrderManager />
                  </RequireAdmin>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
