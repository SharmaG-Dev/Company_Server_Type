"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Instance = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION
});
var spaceEndpoint = new aws_sdk_1.default.Endpoint("".concat(process.env.S3_ENDPOINT));
exports.S3Instance = new aws_sdk_1.default.S3({ endpoint: spaceEndpoint });
