"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var blog_controller_1 = require("../../helpers/v1/controllers/blog.controller");
var auth_m_1 = require("../../helpers/v1/middlewares/auth.m");
var validators_1 = require("../../config/validators");
var validator_schema_1 = require("../../helpers/v1/validators/validator.schema");
var validator_func_1 = require("../../helpers/v1/validators/validator.func");
var router = express_1.default.Router();
var privateRoutes = express_1.default.Router();
var publicRoutes = express_1.default.Router();
privateRoutes.use(auth_m_1.Authorization);
router.use(privateRoutes);
router.use(publicRoutes);
privateRoutes.route('/create').post((0, validators_1.ValidateWithSchema)(validator_schema_1.BlogCreateValidateschema, validator_func_1.validateBody), blog_controller_1.CreateBlog);
publicRoutes.route('/get').get((0, validators_1.ValidateWithSchema)(validator_schema_1.BlogGetValidatesSchema, validator_func_1.validateQuery), blog_controller_1.GetBlog);
privateRoutes.route('/delete').delete((0, validators_1.ValidateWithSchema)(validator_schema_1.BlogDeleteSchema, validator_func_1.validateQuery), blog_controller_1.handleDeleteBlog);
privateRoutes.route('/profile-blogs/:profileId').get(blog_controller_1.handlGetProfileBlogs);
privateRoutes.route('/single-blog/:id').get(blog_controller_1.handleGetSingleBlog);
// comments api 
privateRoutes.route('/comment/:id').post(blog_controller_1.handleCommentCreate);
privateRoutes.route('/comment-delete/:commentId').delete(blog_controller_1.handleDeleteComment);
privateRoutes.route('/comment/get/:blogId').get(blog_controller_1.handleGetComments);
privateRoutes.route('/comment/get-sub/:blogId/:commentId').get(blog_controller_1.handleGetSubComments);
// Likes Api 
privateRoutes.route('/like').get(blog_controller_1.handleLIke);
privateRoutes.route('/unlike').get(blog_controller_1.handleUnlike);
// Views Api 
privateRoutes.route('/view').get(blog_controller_1.handleViews);
exports.default = router;
