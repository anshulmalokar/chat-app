import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app);

const connections: {
  [key: string]: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
} = {};

const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  if(username){
    connections[username?.toString()] = socket; 
  }
  socket.on("message", (data) => {
    console.log(data, " received...");
    // const re_msg = data;
    // socket.broadcast.emit("chat_msg", re_msg);
    // console.log("broadcasting done " + re_msg);
  });
});

app.get("/", (req, res) => {
  return res.json({
    msg: "Hello World",
  });
});

server.listen(PORT, () => {
  console.log(`The server started at ${PORT}`);
});
