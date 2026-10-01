export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search the menu…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search the menu"
    />
  )
}
