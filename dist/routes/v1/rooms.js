"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_m_1 = require("../../helpers/v1/middlewares/auth.m");
var room_controllers_1 = require("../../helpers/v1/controllers/room.controllers");
var router = express_1.default.Router();
var privateRoutes = express_1.default.Router();
var publicRoutes = express_1.default.Router();
privateRoutes.use(auth_m_1.Authorization);
router.use(privateRoutes);
router.use(publicRoutes);
privateRoutes.route('/get/:id').get(room_controllers_1.handleGetRoom);
privateRoutes.route('/join/:roomid').get(room_controllers_1.handleJoinRoom);
privateRoutes.route('/leave/:roomid').get(room_controllers_1.handleLeaveRoom);
privateRoutes.route('/room-message/:roomId').get(room_controllers_1.handleGetRoomMessage);
exports.default = router;
