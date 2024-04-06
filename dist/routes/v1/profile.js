"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_m_1 = require("../../helpers/v1/middlewares/auth.m");
var profile_controllers_1 = require("../../helpers/v1/controllers/profile.controllers");
var router = express_1.default.Router();
var privateRoutes = express_1.default.Router();
var publicRoutes = express_1.default.Router();
privateRoutes.use(auth_m_1.Authorization);
router.use(publicRoutes);
router.use(privateRoutes);
privateRoutes.route('/get-all').get(profile_controllers_1.GetAllProfile);
privateRoutes.route('/update').patch(profile_controllers_1.UpdateProfile);
exports.default = router;
