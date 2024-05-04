"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDeleteSchema = exports.BlogGetValidatesSchema = exports.BlogCreateValidateschema = exports.TagsGetValidateSchem = exports.TagsDeleteValidateSchema = exports.TagsValidateSchema = exports.AdminLoginSchema = exports.AdminSignupSchema = exports.deleteUserSchema = exports.loginValidateSchema = exports.SignupValidateSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.SignupValidateSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(6),
    googleId: joi_1.default.string().optional()
});
exports.loginValidateSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6)
});
exports.deleteUserSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
exports.AdminSignupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6),
    avatar: joi_1.default.string().required()
});
exports.AdminLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6)
});
exports.TagsValidateSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(1)
});
exports.TagsDeleteValidateSchema = joi_1.default.object({
    id: joi_1.default.string().required().uuid()
});
exports.TagsGetValidateSchem = joi_1.default.object({
    id: joi_1.default.string().uuid().optional(),
    active: joi_1.default.string().optional()
});
exports.BlogCreateValidateschema = joi_1.default.object({
    title: joi_1.default.string().required().min(1),
    images: joi_1.default.array().required().min(1),
    sortDisc: joi_1.default.string().required().min(1),
    longDisc: joi_1.default.string().required().min(1),
    BlogTags: joi_1.default.array().required().min(1),
    profileId: joi_1.default.string().required()
});
exports.BlogGetValidatesSchema = joi_1.default.object({
    tagId: joi_1.default.array()
});
exports.BlogDeleteSchema = joi_1.default.object({
    id: joi_1.default.string().uuid()
});
