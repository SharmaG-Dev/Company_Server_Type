"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_m_1 = require("../../../helpers/v1/middlewares/auth.m");
var admin_contollers_1 = require("../../../helpers/v1/controllers/admin/admin.contollers");
var router = express_1.default.Router();
var privateRoutes = express_1.default.Router();
var publicRoutes = express_1.default.Router();
privateRoutes.use(auth_m_1.Authorization);
router.use(privateRoutes);
router.use(publicRoutes);
privateRoutes.route('/me').get(admin_contollers_1.findSelfAdmin);
exports.default = router;
