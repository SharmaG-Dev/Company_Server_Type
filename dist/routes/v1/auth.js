"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../../helpers/v1/controllers/auth.controller");
var validators_1 = require("../../config/validators");
var validator_schema_1 = require("../../helpers/v1/validators/validator.schema");
var validator_func_1 = require("../../helpers/v1/validators/validator.func");
var router = express_1.default.Router();
router.route('/signup').post((0, validators_1.ValidateWithSchema)(validator_schema_1.SignupValidateSchema, validator_func_1.validateBody), auth_controller_1.Signup);
router.route('/login').post((0, validators_1.ValidateWithSchema)(validator_schema_1.loginValidateSchema, validator_func_1.validateBody), auth_controller_1.Login);
exports.default = router;
