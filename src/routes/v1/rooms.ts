import express from 'express'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import { handleGetRoom, handleGetRoomMessage, handleJoinRoom, handleLeaveRoom } from '../../helpers/v1/controllers/room.controllers'

const router = express.Router()

const privateRoutes = express.Router()
const publicRoutes = express.Router()


privateRoutes.use(Authorization)

router.use(privateRoutes)
router.use(publicRoutes)

privateRoutes.route('/get/:id').get(handleGetRoom)
privateRoutes.route('/join/:roomid').get(handleJoinRoom)
privateRoutes.route('/leave/:roomid').get(handleLeaveRoom)
privateRoutes.route('/room-message/:roomId').get(handleGetRoomMessage)

export default router