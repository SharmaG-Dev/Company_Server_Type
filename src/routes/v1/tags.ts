



import express from 'express'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import { ValidateWithSchema } from '../../config/validators'
import { TagsDeleteValidateSchema, TagsGetValidateSchem, TagsValidateSchema } from '../../helpers/v1/validators/validator.schema'
import { validateBody, validateParams, validateQuery } from '../../helpers/v1/validators/validator.func'
import { GetTagsActiveList, GetTagsList, RegisterTag, deleteTag } from '../../helpers/v1/controllers/tags.controller'

const router = express.Router()

const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(privateRoutes)
router.use(publicRoutes)


privateRoutes.route('/create').post(ValidateWithSchema(TagsValidateSchema, validateBody), RegisterTag)
privateRoutes.route('/delete/:id').get(ValidateWithSchema(TagsDeleteValidateSchema, validateParams), deleteTag)
privateRoutes.route('/get').get(ValidateWithSchema(TagsGetValidateSchem, validateQuery), GetTagsList)
privateRoutes.route('/active-list').get(GetTagsActiveList)

export default router 