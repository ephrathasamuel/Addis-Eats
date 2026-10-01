// Formats a number as Ethiopian Birr consistently across the app.
// e.g. formatETB(320) -> "ETB 320.00"
export function formatETB(amount) {
  const value = Number(amount) || 0
  return `ETB ${value.toFixed(2)}`
}
