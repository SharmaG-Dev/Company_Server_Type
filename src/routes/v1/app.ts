import express from 'express'
import AuthRoutes from './auth'
import UserRoutes from './user'
import ProfileRoutes from './profile'

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)
router.use('/profile', ProfileRoutes)

export default router
