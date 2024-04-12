"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Client_1 = require("./config/Client");
var app_1 = __importDefault(require("./routes/v1/app"));
var multer_1 = __importDefault(require("multer"));
var app = (0, express_1.default)();
var port = parseInt(process.env.PORT || '5000', 10);
var upload = (0, multer_1.default)().any();
app.use(upload);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
Client_1.prisma.$connect()
    .then(function () {
    console.log('connected database successfully');
})
    .catch(function (err) {
    console.log(err.message);
});
app.use('/api/v1/', app_1.default);
app.get('/', function (req, res) {
    res.send('Welcome to the chatting server');
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
