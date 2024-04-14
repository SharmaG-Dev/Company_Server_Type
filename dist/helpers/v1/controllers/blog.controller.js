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
exports.handleViews = exports.handleUnlike = exports.handleLIke = exports.handleDeleteComment = exports.handleCommentCreate = exports.handlGetProfileBlogs = exports.handleDeleteBlog = exports.handleGetSingleBlog = exports.GetBlog = exports.CreateBlog = void 0;
var blog_func_1 = require("../func/blog.func");
var CreateBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formdata, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formdata = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.CreateBlogPost)(formdata)];
            case 2:
                response = _a.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
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
exports.CreateBlog = CreateBlog;
var GetBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, blog_func_1.GetBlogPost)()];
            case 1:
                response = _a.sent();
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: true, message: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetBlog = GetBlog;
var handleGetSingleBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.GetSingleBlog)(id)];
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
exports.handleGetSingleBlog = handleGetSingleBlog;
var handleDeleteBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.DeleteBlog)({ id: id })];
            case 2:
                response = _a.sent();
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
exports.handleDeleteBlog = handleDeleteBlog;
var handlGetProfileBlogs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.params.profileId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.GetprofileBlogs)({ profileId: profileId })];
            case 2:
                response = _a.sent();
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).json({ error: true, message: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handlGetProfileBlogs = handlGetProfileBlogs;
var handleCommentCreate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, comment, commentId, profileId, response, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, comment = _a.comment, commentId = _a.commentId;
                profileId = req.user.profileId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.CreateComment)({ blogId: id, comment: comment, commentId: commentId, profileId: profileId })];
            case 2:
                response = _b.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                res.status(500).json({ error: true, message: error_6 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleCommentCreate = handleCommentCreate;
var handleDeleteComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var commentId, response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commentId = req.params.commentId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.DeleteComment)(commentId)];
            case 2:
                response = _a.sent();
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).json({ error: true, message: error_7 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleDeleteComment = handleDeleteComment;
var handleLIke = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, blogId, commentId, id, resposne, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, blogId = _a.blogId, commentId = _a.commentId;
                id = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.RecordLikes)({ userId: id, blogId: blogId, commentsId: commentId })];
            case 2:
                resposne = _b.sent();
                if (!resposne)
                    return [2 /*return*/, res.status(400).json({ error: true, message: resposne })];
                res.status(200).json({ error: false, message: 'success', data: resposne });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _b.sent();
                res.status(500).json({ error: true, message: error_8 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleLIke = handleLIke;
var handleUnlike = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, commentsId, blogId, id, response, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, commentsId = _a.commentsId, blogId = _a.blogId;
                id = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (!commentsId && !blogId)
                    return [2 /*return*/, res.status(401).json({ error: true, message: 'provide the commentId or blogId' })];
                return [4 /*yield*/, (0, blog_func_1.RemoveLike)({ userId: id, commentsId: commentsId, blogId: blogId })];
            case 2:
                response = _b.sent();
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _b.sent();
                res.status(500).json({ error: true, message: error_9 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleUnlike = handleUnlike;
// views Api 
var handleViews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, profileId, blogId, id, response, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, profileId = _a.profileId, blogId = _a.blogId;
                id = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, blog_func_1.ViewRegister)({ userid: id, profileId: profileId, blogId: blogId })];
            case 2:
                response = _b.sent();
                if (!response)
                    return [2 /*return*/, res.status(400).json({ error: true, message: response })];
                res.status(200).json({ error: false, message: 'success', data: response });
                return [3 /*break*/, 4];
            case 3:
                error_10 = _b.sent();
                res.status(500).json({ error: true, message: error_10 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleViews = handleViews;
