import { API_ROUTE } from './API_ROUTE'
import axios from 'axios'
export async function tokenRequest () {
  try {
    const { data } = await axios.get(`${API_ROUTE}/user/token`, {
      credentials: 'include'
    })
    return data
  } catch (err) {
    console.log('Error al validar token', err)
  }
}
