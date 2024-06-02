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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocket = void 0;
var eventEmitter_1 = __importDefault(require("./../../../config/eventEmitter"));
var blog_func_1 = require("../func/blog.func");
var Query_func_1 = require("../func/Query.func");
var queryHashtag_1 = require("../utils/queryHashtag");
var token_handler_1 = require("./token.handler");
var userActives = new Map();
var InRooomUser = new Map();
var handleSocket = function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var _user, token;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                token = (_b = (_a = socket.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.token;
                console.log('connected user', token);
                if (!token) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, token_handler_1.HandleToken)(token)];
            case 1:
                _user = (_c.sent());
                if (_user) {
                    userActives.set(_user === null || _user === void 0 ? void 0 : _user.id, _user);
                }
                _c.label = 2;
            case 2:
                socket.on('joined-room', function (data) {
                    var roomId = InRooomUser.get(data === null || data === void 0 ? void 0 : data.roomId);
                    InRooomUser.set(data === null || data === void 0 ? void 0 : data.roomId, __spreadArray(__spreadArray([], roomId, true), [data === null || data === void 0 ? void 0 : data.user], false));
                });
                socket.on('leave-room', function (data) {
                    var roomId = InRooomUser.get(data === null || data === void 0 ? void 0 : data.roomId);
                    var newData = roomId.filter(function (item) { return item !== (data === null || data === void 0 ? void 0 : data.user); });
                    InRooomUser.set(data === null || data === void 0 ? void 0 : data.roomId, __spreadArray([], newData, true));
                });
                socket.on('room-users', function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, data, key, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, Query_func_1.GetRoomParticipants)(roomId)];
                            case 1:
                                response = _a.sent();
                                data = {
                                    response: response,
                                    InRooomUser: InRooomUser,
                                    userActives: userActives
                                };
                                key = (0, queryHashtag_1.QueryHashtagUnique)(roomId);
                                socket.emit("USER".concat(key), JSON.stringify(data));
                                socket.broadcast.emit("USER".concat(key), JSON.stringify(data));
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.log('error found in socket', error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('blogs', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _blogs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, blog_func_1.GetBlogPost)()];
                            case 1:
                                _blogs = _a.sent();
                                socket.emit('blogs', JSON.stringify(_blogs));
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('message', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var _messages, roomKey, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!(data !== null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, Query_func_1.GetRoomMessage)(data)];
                            case 1:
                                _messages = _a.sent();
                                roomKey = (0, queryHashtag_1.QueryHashtagUnique)(data);
                                socket.emit(roomKey, JSON.stringify(_messages));
                                socket.broadcast.emit(roomKey, JSON.stringify(_messages));
                                _a.label = 2;
                            case 2: return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                console.error("Error fetching messages for room ".concat(data, ":"), error_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                eventEmitter_1.default.on('Blog:new', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _blogs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, blog_func_1.GetBlogPost)()];
                            case 1:
                                _blogs = _a.sent();
                                socket.broadcast.emit('blogs', JSON.stringify(_blogs));
                                return [2 /*return*/];
                        }
                    });
                }); });
                eventEmitter_1.default.on('message', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var _messages, roomKey;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, Query_func_1.GetRoomMessage)(data.roomId)];
                            case 1:
                                _messages = _a.sent();
                                roomKey = (0, queryHashtag_1.QueryHashtagUnique)(data.roomId);
                                socket.broadcast.emit(roomKey, _messages);
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('disconnect', function (token) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('disconnected the', token);
                                if (!token) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, token_handler_1.HandleToken)(token)];
                            case 1:
                                _user = (_a.sent());
                                if (_user) {
                                    userActives.delete(_user === null || _user === void 0 ? void 0 : _user.id);
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.handleSocket = handleSocket;
