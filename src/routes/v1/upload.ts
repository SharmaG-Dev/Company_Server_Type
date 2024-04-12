import express from 'express'
import { handleUploadFile } from '../../helpers/v1/controllers/upload.controller'


const router = express.Router()

router.route('/file').post(handleUploadFile)


export default router