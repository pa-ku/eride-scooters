export const createMpPreference = async ({ title, price }) => {
  try {
    const res = await fetch(
      'https://eride-api.vercel.app/api/payment/create_preference',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: title,
          price,
          quantity: 1
        })
      }
    )
    const data = await res.json()
    return data.id
  } catch (err) {
    console.log(err)
  }
}
