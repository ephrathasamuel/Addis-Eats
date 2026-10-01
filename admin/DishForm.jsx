import { useState } from 'react'
import Button from '../src/ui/Button.jsx'

const CATEGORIES = ['Ethiopian', 'Pizza', 'Burgers', 'Drinks']

export default function DishForm({ initialDish, onSave, onCancel }) {
  const [form, setForm] = useState(
    initialDish || {
      name: '',
      category: CATEGORIES[0],
      price: '',
      description: '',
      image: '',
      special: false,
      soldOut: false,
    }
  )

  function handleChange(field) {
    return (e) => {
      const value = field === 'special' || field === 'soldOut' ? e.target.checked : e.target.value
      setForm((f) => ({ ...f, [field]: value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form, price: Number(form.price) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="dish-name">Name</label>
        <input id="dish-name" value={form.name} onChange={handleChange('name')} required />
      </div>

      <div className="form-field">
        <label htmlFor="dish-category">Category</label>
        <select id="dish-category" value={form.category} onChange={handleChange('category')}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="dish-price">Price (ETB)</label>
        <input
          id="dish-price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange('price')}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="dish-image">Image URL</label>
        <input
          id="dish-image"
          value={form.image}
          onChange={handleChange('image')}
          placeholder="https://…"
        />
      </div>

      <div className="form-field">
        <label htmlFor="dish-description">Description</label>
        <textarea
          id="dish-description"
          rows={3}
          value={form.description}
          onChange={handleChange('description')}
        />
      </div>

      <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '1rem' }}>
        <input type="checkbox" checked={!!form.special} onChange={handleChange('special')} />
        Today's special
      </label>

      <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '1rem' }}>
        <input type="checkbox" checked={!!form.soldOut} onChange={handleChange('soldOut')} />
        Sold out
      </label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button type="submit">Save</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
