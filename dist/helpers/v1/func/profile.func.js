"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.RemoveFriend = exports.AcceptFriendRequest = exports.CreateFriendRequest = exports.GetSingleprofile = exports.GetProfiles = exports.DeactivateProfile = exports.UpdateUserProfile = exports.CreateProfile = void 0;
var Client_1 = require("../../../config/Client");
function CreateProfile(input) {
    return __awaiter(this, void 0, void 0, function () {
        var profileId, _profile, _createdProfile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, Client_1.genId)()];
                case 1:
                    profileId = _a.sent();
                    _profile = {
                        id: profileId,
                        name: input.name,
                        email: input.email,
                        googleId: input.googleId,
                    };
                    return [4 /*yield*/, Client_1.prisma.profile.create({
                            data: _profile,
                        })];
                case 2:
                    _createdProfile = _a.sent();
                    return [2 /*return*/, _createdProfile];
            }
        });
    });
}
exports.CreateProfile = CreateProfile;
function UpdateUserProfile(input) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _updateProfile, _updatedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = input;
                    _updateProfile = {
                        avatar: data.avatar,
                        name: data.name,
                    };
                    return [4 /*yield*/, Client_1.prisma.profile.update({
                            where: { id: data.id },
                            data: _updateProfile,
                        })];
                case 1:
                    _updatedData = _a.sent();
                    return [2 /*return*/, _updatedData];
            }
        });
    });
}
exports.UpdateUserProfile = UpdateUserProfile;
function DeactivateProfile(id) {
    return __awaiter(this, void 0, void 0, function () {
        var _update, _DeactivatedProfile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _update = {
                        active: false,
                    };
                    return [4 /*yield*/, Client_1.prisma.profile.update({
                            where: { id: id },
                            data: _update,
                        })];
                case 1:
                    _DeactivatedProfile = _a.sent();
                    return [2 /*return*/, _DeactivatedProfile];
            }
        });
    });
}
exports.DeactivateProfile = DeactivateProfile;
function GetProfiles(params) {
    return __awaiter(this, void 0, void 0, function () {
        var _profiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Client_1.prisma.profile.findMany({
                        where: __assign({}, params),
                        include: {
                            friendRequestRecieved: true,
                            friendRequestSent: true,
                            friendsList: true
                        }
                    })];
                case 1:
                    _profiles = _a.sent();
                    return [2 /*return*/, _profiles];
            }
        });
    });
}
exports.GetProfiles = GetProfiles;
function GetSingleprofile(profileId) {
    return __awaiter(this, void 0, void 0, function () {
        var _profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Client_1.prisma.profile.findUnique({
                        where: {
                            id: profileId
                        },
                        include: {
                            friendRequestRecieved: true,
                            friendRequestSent: true,
                            friendsList: true,
                        }
                    })];
                case 1:
                    _profile = _a.sent();
                    return [2 /*return*/, _profile];
            }
        });
    });
}
exports.GetSingleprofile = GetSingleprofile;
// Friends Request Api  
function CreateFriendRequest(input) {
    return __awaiter(this, void 0, void 0, function () {
        var receiverId, senderId, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    receiverId = input.receiverId, senderId = input.senderId;
                    return [4 /*yield*/, Client_1.prisma.friendsRequest.create({
                            data: {
                                receiverId: receiverId,
                                senderId: senderId
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.CreateFriendRequest = CreateFriendRequest;
function AcceptFriendRequest(input) {
    return __awaiter(this, void 0, void 0, function () {
        var id, senderId, receiverId, status_1, _updated, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    id = input.id, senderId = input.senderId, receiverId = input.receiverId, status_1 = input.status;
                    return [4 /*yield*/, Client_1.prisma.friendsRequest.update({
                            where: {
                                id: id,
                            },
                            data: {
                                status: status_1,
                            },
                        })];
                case 1:
                    _updated = _a.sent();
                    if (!_updated) {
                        return [2 /*return*/, 'no request found '];
                    }
                    if (_updated.status === 'rejected') {
                        return [2 /*return*/, _updated];
                    }
                    return [4 /*yield*/, Client_1.prisma.profile.update({
                            where: {
                                id: _updated.receiverId,
                            },
                            data: {
                                friendId: senderId
                            },
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Client_1.prisma.profile.update({
                            where: {
                                id: _updated.senderId,
                            },
                            data: {
                                friendId: receiverId
                            },
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, 'Friend request accepted successfully'];
                case 4:
                    error_1 = _a.sent();
                    // Handle error
                    console.error('Error accepting friend request:', error_1);
                    throw new Error('Failed to accept friend request');
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.AcceptFriendRequest = AcceptFriendRequest;
function RemoveFriend(input) {
    return __awaiter(this, void 0, void 0, function () {
        var userProfileId, profileId, _a, _userUpdate, secondUserUpdate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userProfileId = input.userProfileId, profileId = input.profileId;
                    return [4 /*yield*/, Promise.all([
                            Client_1.prisma.profile.update({
                                where: {
                                    id: profileId
                                },
                                data: {
                                    friendsList: {
                                        disconnect: {
                                            id: userProfileId
                                        }
                                    }
                                }
                            }),
                            Client_1.prisma.profile.update({
                                where: {
                                    id: userProfileId
                                },
                                data: {
                                    friendsList: {
                                        disconnect: {
                                            id: profileId
                                        }
                                    }
                                }
                            })
                        ])];
                case 1:
                    _a = _b.sent(), _userUpdate = _a[0], secondUserUpdate = _a[1];
                    if (!_userUpdate && !secondUserUpdate)
                        throw Error('failed to remove friend');
                    return [2 /*return*/, 'successfully removed friend'];
            }
        });
    });
}
exports.RemoveFriend = RemoveFriend;
