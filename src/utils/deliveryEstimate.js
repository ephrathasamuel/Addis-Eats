// Simple lookup table standing in for a real distance/traffic calculation.
const AREAS = {
  Bole: { fee: 60, etaMinutes: 30 },
  Piassa: { fee: 50, etaMinutes: 25 },
  'Kazanchis': { fee: 45, etaMinutes: 20 },
  'CMC': { fee: 70, etaMinutes: 40 },
  'Sarbet': { fee: 55, etaMinutes: 28 },
}

const DEFAULT_ESTIMATE = { fee: 65, etaMinutes: 35 }

export const DELIVERY_AREAS = Object.keys(AREAS)

export function getDeliveryEstimate(area) {
  return AREAS[area] || DEFAULT_ESTIMATE
}
