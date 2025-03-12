import cors from 'cors'

const allowedOrigins = [
  'https://eridestore.netlify.app',
  'https://eridestore.vercel.app',
  'https://eride.paku.com.ar',
  'https://www.eride.paku.com.ar',
  'http://localhost:3000',
  'http://localhost:5172',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
];

export default function corsMiddleware() {
  const CORS_OPTIONS = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }

  return cors(CORS_OPTIONS)
}