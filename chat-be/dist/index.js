"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        allowedHeaders: ["*"],
        origin: "*"
    }
});
io.on('connection', socket => {
    console.log('Connection established');
    socket.on('message', (data) => {
        console.log(data, " received...");
        const re_msg = data + " sending back...";
        socket.emit(re_msg);
    });
});
const PORT = process.env.PORT || 3002;
app.get('/', (req, res) => {
    return res.json({
        msg: "Hello World"
    });
});
server.listen(PORT, () => {
    console.log(`The server started at ${PORT}`);
});
