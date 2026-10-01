export default function Spinner({ label = 'Loading…' }) {
  return (
    <div role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p style={{ textAlign: 'center' }}>{label}</p>
    </div>
  )
}
