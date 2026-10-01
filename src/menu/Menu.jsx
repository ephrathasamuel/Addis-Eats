import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { getDishes } from '../api/dishes.js'
import Spinner from '../ui/Spinner.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import SearchBar from './SearchBar.jsx'
import CategoryBar from './CategoryBar.jsx'
import DishList from './DishList.jsx'

export default function Menu() {
  // Category lives in the URL — shareable, survives a refresh.
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'All'

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 200)

  const { data: dishes, loading, error, refetch } = useFetchDishes()

  const filtered = useMemo(() => {
    if (!dishes) return []
    return dishes.filter((dish) => {
      const matchesCategory = category === 'All' || dish.category === category
      const matchesSearch = dish.name
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [dishes, category, debouncedSearch])

  function handleCategorySelect(nextCategory) {
    if (nextCategory === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: nextCategory })
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">Menu</h1>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryBar active={category} onSelect={handleCategorySelect} />

      {loading && <Spinner label="Loading the menu…" />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && <DishList dishes={filtered} />}
    </div>
  )
}

function useFetchDishes() {
  const [reloadKey, setReloadKey] = useState(0)
  const { data, loading, error } = useFetch(getDishes, [reloadKey])
  return { data, loading, error, refetch: () => setReloadKey((k) => k + 1) }
}
