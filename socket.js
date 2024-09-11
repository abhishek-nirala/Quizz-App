import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let players = [];

app.get("/", (res, req) => {
  req.end("server running!");
});

io.on("connection", (socket) => {
  console.log("a new user connected with an id : ", socket.id);

  //adding a new player;
  players.push(socket.id);
  if (players.length > 2) socket.emit("room-full"); //not letting more than two player to join in on a single room

  //listening on the option-selected by the other user.
  socket.on("option-selected", (data) => {
    socket.broadcast.emit("other-player-selected", data);
  });
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
