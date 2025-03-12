import { Router } from 'express'
const router = Router()
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
  addToFavorites,
  editProfile,
  getUserFavorites
} from './user.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { registerSchema, loginSchema } from './user.schema.js'

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.get('/logout', logout)
router.get('/token', verifyToken)
router.get('/profile', authRequired, profile)
router.patch('/profile', authRequired, editProfile)


router.get('/favorites/', authRequired, getUserFavorites)
router.post('/favorites', authRequired, addToFavorites)

export default router
