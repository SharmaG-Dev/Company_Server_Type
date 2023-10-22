import express from 'express'
import UserRoutes from 'routes/v1/user'

const router = express.Router()

router.use('/user', UserRoutes)


export default router
