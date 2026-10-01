import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { getDishes } from '../api/dishes.js'
import Spinner from '../ui/Spinner.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import DishList from '../menu/DishList.jsx'
import Button from '../ui/Button.jsx'

export default function Home() {
  const { data: dishes, loading, error } = useFetch(getDishes, [])
  const specials = (dishes || []).filter((d) => d.special)

  return (
    <div className="container">
      <h1 className="page-title">Today's specials in Addis Ababa</h1>
      <p style={{ maxWidth: '60ch', marginBottom: '2rem' }}>
        Order from our kitchen: from doro wat to wood fired pizza and we'll
        have it at your door.
      </p>

      {loading && <Spinner label="Loading today's specials…" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <DishList dishes={specials} />}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/menu">
          <Button>See the full menu</Button>
        </Link>
      </div>
    </div>
  )
}
