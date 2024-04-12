"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_controller_1 = require("../../helpers/v1/controllers/upload.controller");
var router = express_1.default.Router();
router.route('/file').post(upload_controller_1.handleUploadFile);
exports.default = router;
