import { Router } from 'express'
const router = Router()
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { scooterSchema } from './scooter.schema.js'
import {
  getAll,
  deleteOne,
  updateOne,
  getScootersById,
  createOne,
  getNames,
  getOneById,
  getScootersByFilter,
} from './scooter.controller.js'

router.get('/scooters', getAll)
router.get('/scooters/names', getNames)
router.get('/scooters/:id', getOneById)
router.post('/scooters/multiple', getScootersById)
router.get('/scooters/filter/:type', getScootersByFilter)

router.post('/scooters', authRequired, validateSchema(scooterSchema), createOne)
router.delete('/scooters/:id', authRequired, deleteOne)
router.patch('/scooters/:id', authRequired, updateOne)

export default router
