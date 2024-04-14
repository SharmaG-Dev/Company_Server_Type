import express from 'express'
import { CreateBlog, GetBlog, handlGetProfileBlogs, handleCommentCreate, handleDeleteBlog, handleDeleteComment, handleGetSingleBlog, handleLIke, handleUnlike, handleViews } from '../../helpers/v1/controllers/blog.controller'
import { Authorization } from '../../helpers/v1/middlewares/auth.m'
import { ValidateWithSchema } from '../../config/validators'
import { BlogCreateValidateschema, BlogDeleteSchema, BlogGetValidatesSchema } from '../../helpers/v1/validators/validator.schema'
import { validateBody, validateQuery } from '../../helpers/v1/validators/validator.func'


const router = express.Router()
const privateRoutes = express.Router()
const publicRoutes = express.Router()

privateRoutes.use(Authorization)

router.use(privateRoutes)
router.use(publicRoutes)

privateRoutes.route('/create').post(ValidateWithSchema(BlogCreateValidateschema, validateBody), CreateBlog)
privateRoutes.route('/get').get(ValidateWithSchema(BlogGetValidatesSchema, validateQuery), GetBlog)
privateRoutes.route('/delete').delete(ValidateWithSchema(BlogDeleteSchema, validateQuery), handleDeleteBlog)
privateRoutes.route('/profile-blogs/:profileId').get(handlGetProfileBlogs)
privateRoutes.route('/single-blog/:id').get(handleGetSingleBlog)


// comments api 
privateRoutes.route('/comment/:id').post(handleCommentCreate)
privateRoutes.route('/comment-delete/:commentId').delete(handleDeleteComment)

// Likes Api 
privateRoutes.route('/like').get(handleLIke)
privateRoutes.route('/unlike').get(handleUnlike)


// Views Api 

privateRoutes.route('/view').get(handleViews)

export default router 