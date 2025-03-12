import { useState } from 'react'
import { API_ROUTE } from './API_ROUTE'

export default function useGetProductNames () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function requestNames () {
    try {
      setLoading(true)
      const res = await fetch(`${API_ROUTE}/scooters/names`)
      const data = await res.json()
      setData(data)
    } catch (err) {
      setError(error)
      console.error('Hubo un problema con la solicitud!', err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, requestNames, error }
}
