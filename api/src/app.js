import express from 'express'
import cookieParser from 'cookie-parser'
import corsMiddleware from './middlewares/cors.js'
import scooterRoutes from './scooters/scooter.routes.js'
import userRoutes from './user/user.routes.js'
import userPayment from './libs/mpPayment.js'
import 'dotenv/config'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser())

app.use('/api', scooterRoutes)
app.use('/api/payment', userPayment)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Eride API Running')
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}/`)
})

export default app
