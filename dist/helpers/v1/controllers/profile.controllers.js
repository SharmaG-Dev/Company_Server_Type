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
exports.handleRemoveFriends = exports.handleFriendRequestAccept = exports.handleFriendRequestSent = exports.SingleProfileGet = exports.UpdateProfile = exports.GetAllProfile = void 0;
var profile_func_1 = require("../func/profile.func");
var GetAllProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, profile_func_1.GetProfiles)(params)];
            case 2:
                response = _a.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: 'no data found' })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(500).json({ error: true, message: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetAllProfile = GetAllProfile;
var UpdateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, profile_func_1.UpdateUserProfile)(data)];
            case 2:
                response = _a.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: 'updation failed' })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ error: true, message: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.UpdateProfile = UpdateProfile;
var SingleProfileGet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, userData, _find, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.params.profileId;
                userData = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                _find = profileId;
                if (!profileId) {
                    _find = userData.profileId;
                }
                return [4 /*yield*/, (0, profile_func_1.GetSingleprofile)(_find)];
            case 2:
                response = _a.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ error: true, message: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.SingleProfileGet = SingleProfileGet;
var handleFriendRequestSent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, id, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.user.profileId;
                id = req.params.profileId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, profile_func_1.CreateFriendRequest)({ receiverId: id, senderId: profileId })];
            case 2:
                response = _a.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ error: true, message: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleFriendRequestSent = handleFriendRequestSent;
var handleFriendRequestAccept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, _a, requestId, senderId, status, StatusType, response, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                profileId = req.user.profileId;
                _a = req.params, requestId = _a.requestId, senderId = _a.senderId;
                status = req.params.status;
                if (status === 'true') {
                    StatusType = 'accepted';
                }
                else {
                    StatusType = 'rejected';
                }
                console.log(requestId, senderId, profileId, StatusType);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, profile_func_1.AcceptFriendRequest)({ id: requestId, senderId: senderId, receiverId: profileId, status: StatusType })];
            case 2:
                response = _b.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                res.status(500).json({ error: true, message: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleFriendRequestAccept = handleFriendRequestAccept;
var handleRemoveFriends = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, id, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.user.profileId;
                id = req.params.profileId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, profile_func_1.RemoveFriend)({ profileId: id, userProfileId: profileId })];
            case 2:
                response = _a.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).json({ error: true, message: error_6 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleRemoveFriends = handleRemoveFriends;
