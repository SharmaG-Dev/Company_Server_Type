import express from 'express'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import {
  GetAllProfile,
  SingleProfileGet,
  UpdateProfile,
  handleFriendRequestAccept,
  handleFriendRequestSent,
  handleRemoveFriends,
} from '../../helpers/v1/controllers/profile.controllers'

const router = express.Router()

const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(publicRoutes)
router.use(privateRoutes)

privateRoutes.route('/get-all').get(GetAllProfile)
privateRoutes.route('/update').patch(UpdateProfile)
privateRoutes.route('/get-single-profile/:profileId').get(SingleProfileGet)

// friend Api 
privateRoutes.route('/friend/send-request/:profileId').get(handleFriendRequestSent)
privateRoutes.route('/friend/accept-request/:requestId/:senderId/:status').get(handleFriendRequestAccept)
privateRoutes.route('/friend/remove/:profileId').get(handleRemoveFriends)

export default router
