export async function fetchScooters () {
  try {
    const res = await fetch('http://localhost:5000/api/scooters')
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
