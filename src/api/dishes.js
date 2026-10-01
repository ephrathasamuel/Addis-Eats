
const DATA_URL = '/menu-data.json'

export async function getDishes() {
  const res = await fetch(DATA_URL)
  if (!res.ok) {
    throw new Error('Could not load the menu right now.')
  }
  return res.json()
}

export async function getDishById(id) {
  const dishes = await getDishes()
  const dish = dishes.find((d) => d.id === id)
  if (!dish) {
    throw new Error('That dish could not be found.')
  }
  return dish
}
