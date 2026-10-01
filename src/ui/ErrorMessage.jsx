export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p>{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button className="btn secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
