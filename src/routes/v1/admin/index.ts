

import express from 'express'
import AdminAuthRoutes from './auth'
import AdminRoute from './admin'

const router = express.Router()

router.use('/auth', AdminAuthRoutes)
router.use('/admin', AdminRoute)

export default router