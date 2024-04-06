"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.genId = void 0;
var client_1 = require("@prisma/client");
var dotenv_1 = __importDefault(require("dotenv"));
var uuid_1 = require("uuid");
dotenv_1.default.config();
var Client = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
var genId = function () { return (0, uuid_1.v4)(); };
exports.genId = genId;
exports.prisma = Client;
