import express from 'express'
import { Login, Signup } from '../../helpers/v1/controllers/auth.controller'

const router = express.Router()

router.route('/signup').post(Signup)
router.route('/login').post(Login)

export default router
