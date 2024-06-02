import express from 'express'
import AuthRoutes from './auth'
import UserRoutes from './user'
import ProfileRoutes from './profile'
import UploadRoutes from './upload'
import AdminRoutes from './admin/index'
import TagsRoutes from './tags'
import BlogRoutes from './blog'
import RoomRoutes from './rooms'
import MessageRoutes from './message'


const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)
router.use('/profile', ProfileRoutes)
router.use('/upload', UploadRoutes)
router.use('/admin', AdminRoutes)
router.use('/tags', TagsRoutes)
router.use('/blog', BlogRoutes)
router.use('/room', RoomRoutes)
router.use('/message', MessageRoutes)


export default router
