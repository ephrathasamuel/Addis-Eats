import { useEffect, useState } from 'react'
import { useDishStore } from '../src/api/dishStore.js'
import DishForm from './DishForm.jsx'
import Button from '../src/ui/Button.jsx'
import { formatETB } from '../src/utils/formatCurrency.js'

export default function DishManager() {
  const dishes = useDishStore((s) => s.dishes)
  const seedIfNeeded = useDishStore((s) => s.seedIfNeeded)
  const addDish = useDishStore((s) => s.addDish)
  const updateDish = useDishStore((s) => s.updateDish)
  const deleteDish = useDishStore((s) => s.deleteDish)

  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)


  useEffect(() => {
    seedIfNeeded()
  }, [seedIfNeeded])

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(search.trim().toLowerCase())
  )
  const editingDish = dishes.find((d) => d.id === editingId)

  function handleAdd(dish) {
    addDish(dish)
    setShowAddForm(false)
  }

  function handleUpdate(dish) {
    updateDish(editingId, dish)
    setEditingId(null)
  }

  function handleDelete(id) {
    deleteDish(id)
    setConfirmDeleteId(null)
  }

  return (
    <div>
      <h1 className="page-title">Menu management</h1>

      <input
        className="search-bar"
        placeholder="Search dishes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search dishes"
        style={{ maxWidth: 320 }}
      />

      {!showAddForm && !editingId && (
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setShowAddForm(true)}>Add new dish</Button>
        </div>
      )}

      {showAddForm && (
        <div className="admin-panel">
          <h2>Add dish</h2>
          <DishForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingDish && (
        <div className="admin-panel">
          <h2>Edit dish</h2>
          <DishForm
            initialDish={editingDish}
            onSave={handleUpdate}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dish.category}</td>
              <td>{dish.soldOut ? 'Yes' : 'No'}</td>
              <td>{formatETB(dish.price)}</td>
              <td className="admin-row-actions">
                <Button variant="secondary" onClick={() => setEditingId(dish.id)}>
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => updateDish(dish.id, { soldOut: !dish.soldOut })}
                >
                  {dish.soldOut ? 'Mark available' : 'Mark sold out'}
                </Button>
                {confirmDeleteId === dish.id ? (
                  <>
                    <Button onClick={() => handleDelete(dish.id)}>Confirm</Button>
                    <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" onClick={() => setConfirmDeleteId(dish.id)}>
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p>No dishes match your search.</p>}
    </div>
  )
}
