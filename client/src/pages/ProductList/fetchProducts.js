import axios from 'axios'
import { API_ROUTE } from '#services/api/API_ROUTE'

export const fetchProducts = async (filters) => {
    console.log(`${API_ROUTE}/scooters?${filters}`)
    try {
      const ROUTE = `${API_ROUTE}/scooters?${filters}`
      const { data } = await axios.get(ROUTE)
      return data
    } catch (error) {
      console.log(error)
    }
  }