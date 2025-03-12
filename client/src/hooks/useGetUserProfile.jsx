import { useEffect, useState } from 'react'
import { API_ROUTE } from '../services/api/API_ROUTE'

export default function useGetUserProfile () {
  const [userData, setuserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function requestProfile () {
    try {
      const res = await fetch(`${API_ROUTE}/user/profile`, {
        credentials: 'include'
      })
      const data = await res.json()
      setuserData(data)
    } catch (err) {
      setError(error)
      console.error('Hubo un problema con la solicitud!', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestProfile()
  }, [])

  return { userData, loading, error }
}
