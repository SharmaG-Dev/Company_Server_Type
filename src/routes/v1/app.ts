import express from 'express'
import AuthRoutes from './auth'
import UserRoutes from './user'
import ProfileRoutes from './profile'
import UploadRoutes from './upload'

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)
router.use('/profile', ProfileRoutes)
router.use('/upload', UploadRoutes)

export default router
