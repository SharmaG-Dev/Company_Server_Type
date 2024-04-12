"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validators_1 = require("../../../config/validators");
var validator_schema_1 = require("../../../helpers/v1/validators/validator.schema");
var validator_func_1 = require("../../../helpers/v1/validators/validator.func");
var authAdmin_controllers_1 = require("../../../helpers/v1/controllers/admin/authAdmin.controllers");
var router = express_1.default.Router();
router.route('/signup').post((0, validators_1.ValidateWithSchema)(validator_schema_1.AdminSignupSchema, validator_func_1.validateBody), authAdmin_controllers_1.SignupAdmin);
router.route('/login').post((0, validators_1.ValidateWithSchema)(validator_schema_1.AdminLoginSchema, validator_func_1.validateBody), authAdmin_controllers_1.LoginAdmin);
exports.default = router;
