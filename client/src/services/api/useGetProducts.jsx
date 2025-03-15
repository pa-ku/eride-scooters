import { useQuery } from '@tanstack/react-query'
import { API_ROUTE } from './API_ROUTE'
import axios from 'axios'

const fetchProducts = async (endpoint) => {
  const { data } = await axios.get(`${API_ROUTE}/${endpoint}`)
  return data
}

export default function useGetProducts(endpoint) {
  return useQuery({
    queryKey: ['products', endpoint],
    queryFn: () => fetchProducts(endpoint),
    enabled: Boolean(endpoint), // Se ejecuta solo si 'endpoint' existe
  })
}
