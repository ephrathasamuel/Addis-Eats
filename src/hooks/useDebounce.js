import { useEffect, useState } from 'react'

// Delays updating the returned value until `value` has stopped
// so filtering doesn't run on every single keystroke.
export function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
