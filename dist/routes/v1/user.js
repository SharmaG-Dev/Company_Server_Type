"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../../helpers/v1/controllers/user.controller");
var auth_m_1 = require("../../helpers/v1/middlewares/auth.m");
var router = express_1.default.Router();
var privateRoutes = express_1.default.Router();
var publicRoutes = express_1.default.Router();
privateRoutes.use(auth_m_1.Authorization);
router.use(publicRoutes);
router.use(privateRoutes);
privateRoutes.route('/delete-user/:id').delete(user_controller_1.DeleteUser);
privateRoutes.route('/me/:id').get(user_controller_1.GetSelfuser);
exports.default = router;
