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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomParticipants = exports.GetRoomMessage = exports.LeaveRoom = exports.JoinRoom = exports.getRoominfo = exports.createQueryRoom = void 0;
var queryHashtag_1 = require("../utils/queryHashtag");
var Client_1 = require("../../../config/Client");
var createQueryRoom = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var hashtagId, _input, _created;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hashtagId = (0, queryHashtag_1.QueryHashtagUnique)(data.QueryBlogId);
                _input = {
                    QueryBlog: {
                        connect: {
                            id: data.QueryBlogId,
                        },
                    },
                    hashtag: hashtagId,
                };
                return [4 /*yield*/, Client_1.prisma.queryRoom.create({ data: _input })];
            case 1:
                _created = _a.sent();
                return [2 /*return*/, _created];
        }
    });
}); };
exports.createQueryRoom = createQueryRoom;
var getRoominfo = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var _getRoom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.queryRoom.findUnique({
                    where: {
                        id: id
                    },
                    include: {
                        _count: {
                            select: {
                                messages: true,
                                RoomParticipants: true
                            }
                        },
                        RoomParticipants: {
                            include: {
                                profile: true
                            }
                        },
                        messages: true
                    }
                })];
            case 1:
                _getRoom = _a.sent();
                return [2 /*return*/, _getRoom];
        }
    });
}); };
exports.getRoominfo = getRoominfo;
var JoinRoom = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _findRoom, _joinRoom;
    var roomId = _b.roomId, profileId = _b.profileId;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('step 1');
                return [4 /*yield*/, Client_1.prisma.queryRoom.findUnique({ where: { id: roomId } })];
            case 1:
                _findRoom = _c.sent();
                console.log('step 2', _findRoom);
                if (!_findRoom)
                    return [2 /*return*/, 'no room found with this id '];
                return [4 /*yield*/, Client_1.prisma.roomParticipants.create({
                        data: {
                            Roomid: roomId,
                            profileId: profileId
                        }
                    })];
            case 2:
                _joinRoom = _c.sent();
                console.log('step 3');
                return [2 /*return*/, _joinRoom];
        }
    });
}); };
exports.JoinRoom = JoinRoom;
var LeaveRoom = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _findRoomParticipant, _update;
    var roomId = _b.roomId, profileId = _b.profileId;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.roomParticipants.findUnique({
                    where: {
                        profileId_Roomid: { profileId: profileId, Roomid: roomId },
                    },
                })];
            case 1:
                _findRoomParticipant = _c.sent();
                if (!_findRoomParticipant)
                    return [2 /*return*/, 'not a participant of the room'];
                return [4 /*yield*/, Client_1.prisma.roomParticipants.delete({
                        where: {
                            profileId_Roomid: { profileId: profileId, Roomid: roomId },
                        },
                    })];
            case 2:
                _update = _c.sent();
                return [2 /*return*/, _update];
        }
    });
}); };
exports.LeaveRoom = LeaveRoom;
var GetRoomMessage = function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
    var _document;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.roomMessages.findMany({
                    where: { queryRoomId: roomId }, include: {
                        profile: true,
                    }
                })];
            case 1:
                _document = _a.sent();
                return [2 /*return*/, _document];
        }
    });
}); };
exports.GetRoomMessage = GetRoomMessage;
var GetRoomParticipants = function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
    var _document;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.roomParticipants.findMany({
                    where: {
                        Roomid: roomId
                    },
                    select: {
                        profile: true,
                        profileId: true
                    }
                })];
            case 1:
                _document = _a.sent();
                return [2 /*return*/, _document];
        }
    });
}); };
exports.GetRoomParticipants = GetRoomParticipants;
