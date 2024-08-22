import express from "express";
import dotenv from "dotenv";
import http from "http";
import connection from "./db/dbConnection";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { addMessageToConversation } from "./controller/msgController";
import conversation_router from "./router/conversationRouter";
dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000','http://localhost:3001'],
}));
app.use('/msgs',conversation_router);
const server = http.createServer(app);

const connections: {
  [key: string]: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
} = {};

const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*"
  },
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  console.log("Connection Established for " + username);
  if(username){
    connections[username?.toString()] = socket;
  }
  socket.on("message", (data) => {
    console.log(data);
    const sender = data.sender;
    const reciever = data.reciever;
    const reciever_socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = connections[data.reciever as string];
    if(reciever_socket){
      console.log("Reciever Socket exists");
      reciever_socket.emit('chat_msg',data.text);
    }else{
      console.log("Reciever Socket does not exist");
    }
    addMessageToConversation([sender,reciever],data);
  });
});

app.get("/socket",(req,res) => {
  console.log(connections);
  return res.json({});
})

app.get("/", (req, res) => {
  return res.json({
    msg: "Hello World",
  });
});

server.listen(PORT, () => {
  connection();
  console.log(`The server started at ${PORT}`);
});
