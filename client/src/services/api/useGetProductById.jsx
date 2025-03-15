import axios from 'axios'
import { API_ROUTE } from './API_ROUTE'
import { useQuery } from '@tanstack/react-query'

export default function useGetProductById (productId) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_ROUTE}/scooters/${productId}`)
      return data
    },
    enabled: !!productId, // Solo ejecuta si hay un `productId`
    staleTime: 1000 * 60 * 5,
    suspense: true
  })
}
