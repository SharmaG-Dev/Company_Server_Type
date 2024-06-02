


import express from 'express'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import { RegisterMessage } from '../../helpers/v1/controllers/message.controllers'

const router = express.Router()
const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(privateRoutes)
router.use(publicRoutes)


router.route('/send-message/:queryRoomId').post(RegisterMessage)



export default router