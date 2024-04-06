"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../../helpers/v1/controllers/auth.controller");
var router = express_1.default.Router();
router.route('/signup').post(auth_controller_1.Signup);
router.route('/login').post(auth_controller_1.Login);
exports.default = router;
