import express from 'express'
import {
  DeleteUser,
  GetSelfuser,
} from '../../helpers/v1/controllers/user.controller'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import { ValidateWithSchema } from '../../config/validators'
import { deleteUserSchema } from '../../helpers/v1/validators/validator.schema'
import { validateParams } from '../../helpers/v1/validators/validator.func'

const router = express.Router()
const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(publicRoutes)
router.use(privateRoutes)

privateRoutes.route('/delete-user/:id').delete(ValidateWithSchema(deleteUserSchema, validateParams), DeleteUser)
privateRoutes.route('/me').get(GetSelfuser)

export default router
