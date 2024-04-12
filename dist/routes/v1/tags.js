"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_m_1 = require("../../helpers/v1/middlewares/auth.m");
var validators_1 = require("../../config/validators");
var validator_schema_1 = require("../../helpers/v1/validators/validator.schema");
var validator_func_1 = require("../../helpers/v1/validators/validator.func");
var tags_controller_1 = require("../../helpers/v1/controllers/tags.controller");
var router = express_1.default.Router();
var privateRoutes = express_1.default.Router();
var publicRoutes = express_1.default.Router();
privateRoutes.use(auth_m_1.Authorization);
router.use(privateRoutes);
router.use(publicRoutes);
privateRoutes.route('/create').post((0, validators_1.ValidateWithSchema)(validator_schema_1.TagsValidateSchema, validator_func_1.validateBody), tags_controller_1.RegisterTag);
privateRoutes.route('/delete/:id').get((0, validators_1.ValidateWithSchema)(validator_schema_1.TagsDeleteValidateSchema, validator_func_1.validateParams), tags_controller_1.deleteTag);
privateRoutes.route('/get').get((0, validators_1.ValidateWithSchema)(validator_schema_1.TagsGetValidateSchem, validator_func_1.validateQuery), tags_controller_1.GetTagsList);
privateRoutes.route('/active-list').get(tags_controller_1.GetTagsActiveList);
exports.default = router;
