import express from 'express'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import {
  GetAllProfile,
  UpdateProfile,
} from '../../helpers/v1/controllers/profile.controllers'

const router = express.Router()

const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(publicRoutes)
router.use(privateRoutes)

privateRoutes.route('/get-all').get(GetAllProfile)
privateRoutes.route('/update').patch(UpdateProfile)

export default router
