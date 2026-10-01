import { getDeliveryEstimate } from '../utils/deliveryEstimate.js'
import { formatETB } from '../utils/formatCurrency.js'

export default function DeliveryEstimate({ area }) {
  if (!area) return null
  const { fee, etaMinutes } = getDeliveryEstimate(area)

  return (
    <p style={{ opacity: 0.85 }}>
      Delivery to {area}: {formatETB(fee)} · roughly {etaMinutes} minutes
    </p>
  )
}
