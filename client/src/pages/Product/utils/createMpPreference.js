import { API_ROUTE } from "#src/services/api/API_ROUTE.js"
import axios from 'axios'

export async function createMpPreference ({ title, price }) {
    try {
        const res = await axios.post(`${API_ROUTE}api/payment/create_preference`, {
          description: title,
          price,
          quantity: 1,
        })
        return res.data.id
    } catch (err) {
      console.log(err)
    }
  }