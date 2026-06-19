import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import healthRoute from "./routes/health.route.js";
import { createServer } from "http";
import { addUser, getUser, getUsersInRoom, removeUser } from "./utils/users.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use("/health", healthRoute);

io.on("connection", (socket) => {
  console.log("🔌 connected:", socket.id);

  socket.on("join", ({ name, room }, callback) => {
    try {
      console.log("➡️ join:", { name, room, id: socket.id });

      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) {
        console.log("❌ addUser error:", error);
        return callback(error);
      }

      socket.join(user.room);
      console.log(`✅ ${user.name} joined room ${user.room}`);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to room ${user.room}.`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has joined!`,
      });

      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    } catch (e) {
      console.error("💥 join handler crashed:", e);
    }
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left` });
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
      console.log("❌ disconnected:", socket.id);
    }
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.PORT || 3000}`);
});
