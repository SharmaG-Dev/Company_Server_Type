"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = require("dotenv");
var user_func_1 = require("../func/user.func");
var authAdmin_func_1 = require("../func/admin/authAdmin.func");
(0, dotenv_1.config)();
// Extend the Request type to include the 'user' property
function Authorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        var _a;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token)
                    return [2 /*return*/, res.status(401).json({ error: true, message: 'token not found' })];
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, decode) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, id, role, _user;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (error)
                                        return [2 /*return*/, res.status(401).json({ error: true, message: error.message })];
                                    _a = decode, id = _a.id, role = _a.role;
                                    if (!(role && role === 'admin')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, authAdmin_func_1.GetselfAdmin)(id)];
                                case 1:
                                    _user = _b.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, (0, user_func_1.GetSingleUser)(id)];
                                case 3:
                                    _user = _b.sent();
                                    _b.label = 4;
                                case 4:
                                    if (!_user)
                                        return [2 /*return*/, res.status(401).json({ error: true, message: 'no user found' })
                                            // Assign _user to req.user
                                        ];
                                    // Assign _user to req.user
                                    req.user = _user;
                                    next();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            catch (error) {
                res.status(500).json({ error: true, message: error });
            }
            return [2 /*return*/];
        });
    });
}
exports.Authorization = Authorization;
