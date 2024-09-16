import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import axios from "axios";

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
  req.end("server running! : ");
});

io.on("connection", (socket) => {
  console.log("a new user connected with an id : ", socket.id);

  socket.on("get-data", async () => {
    try {
      console.log('in get-data');
      
      const apiRes = await axios.get("https://opentdb.com/api.php?amount=1");
      const data = apiRes.data.results[0];
      console.log(data);

      //adding a new player;
      players.push(socket.id);
      if (players.length > 2) socket.emit("room-full"); //not letting more than two player to join in on a single room

      //sending it on the option-selected by the other user.
      socket.emit("apiRes", {
        category: data.category,
        ques: data.question,
        correct_answer: data.correct_answer,
        incorrect_answer: data.incorrect_answers,
      });
    } catch (error) {
      console.log("got an error", error);
    }
  });
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
