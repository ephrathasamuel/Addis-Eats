import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../cart/cartStore.js'
import { useOrderHistoryStore } from '../orders/orderHistoryStore.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { validateCheckoutForm } from './validate.js'
import { DELIVERY_AREAS, getDeliveryEstimate } from '../utils/deliveryEstimate.js'
import { formatETB } from '../utils/formatCurrency.js'
import Field from './Field.jsx'
import DeliveryEstimate from './DeliveryEstimate.jsx'
import Confirmation from './Confirmation.jsx'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function Checkout() {
  const { user } = useAuth()
  const items = useCartStore((s) => s.items)
  const getTotal = useCartStore((s) => s.getTotal)
  const clearCart = useCartStore((s) => s.clearCart)
  const addOrder = useOrderHistoryStore((s) => s.addOrder)

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    area: '',
    instructions: '',
  })
  const [errors, setErrors] = useState({})
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  if (confirmedOrder) return <Confirmation order={confirmedOrder} />

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Add something from the menu before checking out."
          action={
            <Link to="/menu">
              <Button>Browse the menu</Button>
            </Link>
          }
        />
      </div>
    )
  }

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateCheckoutForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const { fee, etaMinutes } = getDeliveryEstimate(form.area)
    const order = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      area: form.area,
      instructions: form.instructions.trim(),
      items,
      total: getTotal(),
      deliveryFee: fee,
      etaMinutes,
    }

    addOrder(order)
    clearCart()
    setConfirmedOrder(order)
  }

  const total = getTotal()

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <h1 className="page-title">Checkout</h1>
      <form onSubmit={handleSubmit} noValidate>
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            value={form.name}
            onChange={handleChange('name')}
            autoComplete="name"
          />
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="0912345678"
            autoComplete="tel"
          />
        </Field>

        <Field id="area" label="Delivery area" error={errors.area}>
          <select id="area" value={form.area} onChange={handleChange('area')}>
            <option value="">Select an area…</option>
            {DELIVERY_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </Field>
        <DeliveryEstimate area={form.area} />

        <Field id="instructions" label="Special instructions (optional)">
          <textarea
            id="instructions"
            rows={3}
            value={form.instructions}
            onChange={handleChange('instructions')}
            placeholder="e.g. Ring the bell, extra napkins…"
          />
        </Field>

        <p style={{ fontWeight: 700 }}>Order total: {formatETB(total)}</p>
        <Button type="submit">Place order</Button>
      </form>
    </div>
  )
}
