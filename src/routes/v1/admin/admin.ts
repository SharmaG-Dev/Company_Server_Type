



import express from 'express'
import { Authorization } from '../../../helpers/v1/middlewares/auth.m'
import { findSelfAdmin } from '../../../helpers/v1/controllers/admin/admin.contollers'


const router = express.Router()

const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(privateRoutes)
router.use(publicRoutes)



privateRoutes.route('/me').get(findSelfAdmin)


export default router