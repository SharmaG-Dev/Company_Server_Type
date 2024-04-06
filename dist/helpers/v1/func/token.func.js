"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var CreateToken = function (_a) {
    var payload = _a.payload;
    var token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || '', {
        expiresIn: '30d',
    });
    return token;
};
exports.CreateToken = CreateToken;
