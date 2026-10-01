// Pure function, no state — Checkout calls this on submit (and can
// call it on blur) and renders whatever errors come back.
const PHONE_REGEX = /^(\+251|0)?9\d{8}$/

export function validateCheckoutForm({ name, phone, area }) {
  const errors = {}

  if (!name || !name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!phone || !phone.trim()) {
    errors.phone = 'Please enter a phone number.'
  } else if (!PHONE_REGEX.test(phone.trim())) {
    errors.phone = 'Enter a valid Ethiopian phone number, e.g. 0912345678.'
  }

  if (!area) {
    errors.area = 'Please select a delivery area.'
  }

  return errors
}
