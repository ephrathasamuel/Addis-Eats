const CATEGORIES = ['All', 'Ethiopian', 'Pizza', 'Burgers', 'Drinks']

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className="category-bar" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={active === category}
          className={`category-pill ${active === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
