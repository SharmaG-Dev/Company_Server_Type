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
exports.ViewRegister = exports.RemoveLike = exports.RecordLikes = exports.DeleteComment = exports.CreateComment = exports.GetSubComments = exports.fetchComments = exports.getAllQueries = exports.GetprofileBlogs = exports.DeleteBlog = exports.GetSingleBlog = exports.GetBlogPost = exports.CreateBlogPost = void 0;
var Client_1 = require("../../../config/Client");
var Query_func_1 = require("./Query.func");
function CreateBlogPost(input) {
    return __awaiter(this, void 0, void 0, function () {
        var blogId, _blogTagsData, _blog, _createdBlog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogId = (0, Client_1.genId)();
                    _blogTagsData = input.BlogTags.map(function (item) { return ({
                        tag: {
                            connect: {
                                id: item.tagid
                            }
                        }
                    }); });
                    _blog = {
                        id: blogId,
                        title: input.title,
                        images: input.images,
                        isQuerry: input.isQuerry,
                        longDisc: input.longDisc,
                        profile: {
                            connect: {
                                id: input.profileId
                            }
                        },
                        BlogTags: {
                            create: _blogTagsData
                        },
                        sortDisc: input.sortDisc
                    };
                    return [4 /*yield*/, Client_1.prisma.blog.create({
                            data: _blog, include: {
                                BlogTags: {
                                    include: {
                                        tag: true
                                    }
                                },
                                profile: true
                            }
                        })];
                case 1:
                    _createdBlog = _a.sent();
                    console.log('yha tak perfect chal rha');
                    if (!_createdBlog.isQuerry) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, Query_func_1.createQueryRoom)({ QueryBlogId: _createdBlog.id })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, _createdBlog];
            }
        });
    });
}
exports.CreateBlogPost = CreateBlogPost;
var GetBlogPost = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.blog.findMany({
                    include: {
                        BlogTags: {
                            include: {
                                tag: true,
                            }
                        },
                        Likes: {
                            select: {
                                userId: true
                            },
                            where: {
                                isComment: false
                            }
                        },
                        _count: {
                            select: {
                                comments: true,
                                Likes: {
                                    where: {
                                        isComment: false,
                                    }
                                }
                            }
                        },
                        profile: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })];
            case 1:
                _blogs = _a.sent();
                return [2 /*return*/, _blogs];
        }
    });
}); };
exports.GetBlogPost = GetBlogPost;
var GetSingleBlog = function (blogId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.blog.findUnique({
                    where: {
                        id: blogId
                    },
                    include: {
                        BlogTags: {
                            include: {
                                tag: true,
                            }
                        },
                        Likes: {
                            select: {
                                userId: true
                            },
                            where: {
                                isComment: false
                            }
                        },
                        _count: {
                            select: {
                                comments: true,
                                Likes: {
                                    where: {
                                        isComment: false,
                                    }
                                }
                            }
                        },
                        profile: true
                    }
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
exports.GetSingleBlog = GetSingleBlog;
var DeleteBlog = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _blog, _blogtags, _delete;
    var id = _b.id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _blog = {};
                _blogtags = {};
                if (id) {
                    _blog.where = { id: id };
                    _blogtags.where = { blogId: id };
                }
                return [4 /*yield*/, Client_1.prisma.blogTags.deleteMany(_blogtags)];
            case 1:
                _c.sent();
                return [4 /*yield*/, Client_1.prisma.comments.deleteMany({
                        where: {
                            blogId: id
                        }
                    })];
            case 2:
                _c.sent();
                return [4 /*yield*/, Client_1.prisma.blog.deleteMany(_blog)];
            case 3:
                _delete = _c.sent();
                return [2 /*return*/, _delete];
        }
    });
}); };
exports.DeleteBlog = DeleteBlog;
var GetprofileBlogs = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _blogs;
    var profileId = _b.profileId;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.blog.findMany({
                    where: { profileId: profileId }, include: {
                        BlogTags: {
                            include: {
                                tag: true,
                            }
                        },
                        Likes: {
                            select: {
                                userId: true
                            },
                            where: {
                                isComment: false
                            }
                        },
                        _count: {
                            select: {
                                comments: true,
                                Likes: {
                                    where: {
                                        isComment: false,
                                    }
                                }
                            }
                        },
                        profile: true
                    }
                })];
            case 1:
                _blogs = _c.sent();
                return [2 /*return*/, _blogs];
        }
    });
}); };
exports.GetprofileBlogs = GetprofileBlogs;
// fetch the queries only 
var getAllQueries = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.blog.findMany({
                    where: {
                        isQuerry: true
                    },
                    include: {
                        BlogTags: {
                            include: {
                                tag: true,
                            }
                        },
                        Likes: {
                            select: {
                                userId: true
                            },
                            where: {
                                isComment: false
                            }
                        },
                        _count: {
                            select: {
                                comments: true,
                                Likes: {
                                    where: {
                                        isComment: false,
                                    }
                                }
                            }
                        },
                        profile: true,
                        QueryRoom: {
                            include: {
                                RoomParticipants: {
                                    select: {
                                        profileId: true
                                    }
                                },
                                _count: {
                                    select: {
                                        messages: true,
                                        RoomParticipants: true
                                    }
                                }
                            }
                        },
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
exports.getAllQueries = getAllQueries;
// Comments 
var fetchComments = function (blogId) { return __awaiter(void 0, void 0, void 0, function () {
    var _comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.comments.findMany({
                    where: { blogId: blogId, isSubComment: false }, orderBy: {
                        createdAt: 'asc'
                    }, include: {
                        _count: {
                            select: {
                                likes: true,
                                subComments: true
                            }
                        },
                        Profile: true,
                        likes: {
                            select: {
                                userId: true
                            }
                        }
                    }
                })];
            case 1:
                _comments = _a.sent();
                return [2 /*return*/, _comments];
        }
    });
}); };
exports.fetchComments = fetchComments;
var GetSubComments = function (Credentials) { return __awaiter(void 0, void 0, void 0, function () {
    var blogId, commentId, subComments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                blogId = Credentials.blogId, commentId = Credentials.commentId;
                return [4 /*yield*/, Client_1.prisma.comments.findMany({
                        where: {
                            blogId: blogId,
                            commentId: commentId,
                            isSubComment: true
                        },
                        orderBy: {
                            createdAt: 'asc'
                        },
                        include: {
                            likes: {
                                select: {
                                    userId: true
                                }
                            },
                            Profile: true,
                            _count: {
                                select: {
                                    likes: true
                                }
                            }
                        }
                    })];
            case 1:
                subComments = _a.sent();
                return [2 /*return*/, subComments];
        }
    });
}); };
exports.GetSubComments = GetSubComments;
var CreateComment = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, profileId, commentId, blogId, isSubComment, _create;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comment = input.comment, profileId = input.profileId, commentId = input.commentId, blogId = input.blogId;
                isSubComment = Boolean(commentId);
                return [4 /*yield*/, Client_1.prisma.comments.create({
                        data: {
                            comment: comment,
                            blogId: blogId,
                            profileId: profileId,
                            isSubComment: isSubComment,
                            commentId: commentId || null
                        }
                    })];
            case 1:
                _create = _a.sent();
                return [2 /*return*/, _create];
        }
    });
}); };
exports.CreateComment = CreateComment;
var DeleteComment = function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteSubComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Client_1.prisma.comments.delete({
                    where: { id: commentId }, include: {
                        subComments: true
                    }
                })];
            case 1:
                deleteSubComment = _a.sent();
                return [2 /*return*/, deleteSubComment];
        }
    });
}); };
exports.DeleteComment = DeleteComment;
// likes functions 
var RecordLikes = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, blogId, commentsId, isBlog, isComment, _findLike, _likes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = input.userId, blogId = input.blogId, commentsId = input.commentsId;
                isBlog = Boolean(blogId);
                isComment = Boolean(commentsId);
                return [4 /*yield*/, Client_1.prisma.likes.findFirst({ where: { userId: userId, blogId: blogId, commentsId: commentsId, isBlog: isBlog, isComment: isComment } })];
            case 1:
                _findLike = _a.sent();
                if (_findLike)
                    return [2 /*return*/, 'already liked'];
                return [4 /*yield*/, Client_1.prisma.likes.create({
                        data: {
                            isBlog: isBlog,
                            isComment: isComment,
                            userId: userId,
                            commentsId: commentsId,
                            blogId: blogId
                        },
                    })];
            case 2:
                _likes = _a.sent();
                return [2 /*return*/, _likes];
        }
    });
}); };
exports.RecordLikes = RecordLikes;
var RemoveLike = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, blogId, commentsId, isComment, _deletedLike;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = input.userId, blogId = input.blogId, commentsId = input.commentsId;
                isComment = Boolean(commentsId);
                return [4 /*yield*/, Client_1.prisma.likes.deleteMany({
                        where: {
                            userId: userId,
                            blogId: blogId,
                            commentsId: commentsId,
                            isComment: isComment
                        }
                    })];
            case 1:
                _deletedLike = _a.sent();
                return [2 /*return*/, _deletedLike];
        }
    });
}); };
exports.RemoveLike = RemoveLike;
// view Funtions 
var ViewRegister = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, blogId, profileId, isBlog, isProfile, _views;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = input.userid, blogId = input.blogId, profileId = input.profileId;
                isBlog = Boolean(blogId);
                isProfile = Boolean(profileId);
                return [4 /*yield*/, Client_1.prisma.view.create({
                        data: {
                            isBlog: isBlog,
                            isProfile: isProfile,
                            userid: userid,
                            blogId: blogId,
                            profileId: profileId,
                        }
                    })];
            case 1:
                _views = _a.sent();
                return [2 /*return*/, _views];
        }
    });
}); };
exports.ViewRegister = ViewRegister;
