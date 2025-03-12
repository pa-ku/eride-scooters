import { useEffect, useState } from 'react'
import { API_ROUTE } from './API_ROUTE'

export default function useGetManyProductsById (IdArrayOfProducts) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function requestMany () {
    try {
      setLoading(true)
      const res = await fetch(`${API_ROUTE}/scooters/multiple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: IdArrayOfProducts })
      })
      const data = await res.json()
      setData(data)
    } catch (err) {
      setError(err)
      console.error('¡Hubo un problema con la solicitud!', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestMany()
  }, [])

  return { data, loading, error }
}
