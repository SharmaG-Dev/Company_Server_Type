import express from 'express'
import { ValidateWithSchema } from '../../../config/validators'
import { AdminLoginSchema, AdminSignupSchema } from '../../../helpers/v1/validators/validator.schema'
import { validateBody } from '../../../helpers/v1/validators/validator.func'
import { LoginAdmin, SignupAdmin } from '../../../helpers/v1/controllers/admin/authAdmin.controllers'


const router = express.Router()


router.route('/signup').post(ValidateWithSchema(AdminSignupSchema, validateBody), SignupAdmin)

router.route('/login').post(ValidateWithSchema(AdminLoginSchema, validateBody), LoginAdmin)



export default router