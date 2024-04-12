import express from 'express'
import { Login, Signup } from '../../helpers/v1/controllers/auth.controller'
import { ValidateWithSchema } from '../../config/validators'
import { SignupValidateSchema, loginValidateSchema } from '../../helpers/v1/validators/validator.schema'
import { validateBody } from '../../helpers/v1/validators/validator.func'

const router = express.Router()

router.route('/signup').post(ValidateWithSchema(SignupValidateSchema, validateBody), Signup)
router.route('/login').post(ValidateWithSchema(loginValidateSchema, validateBody), Login)

export default router
