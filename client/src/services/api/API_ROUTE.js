export const API_ROUTE =
import.meta.env.VITE_API_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://eride-api.vercel.app/api'
