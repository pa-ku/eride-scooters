export const API_ROUTE =
  process.env.VITE_API_ROUTE === 'development'
    ? 'http://localhost:3000/api'
    : 'https://eride-api.vercel.app/api'
