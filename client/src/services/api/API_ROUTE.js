export const API_ROUTE =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api'
    : 'https://eride-api.vercel.app/api'
