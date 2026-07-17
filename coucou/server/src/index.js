import "dotenv/config";
import dns from "node:dns";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { connectDB } from "./config/db.js";
import healthRoute from "./routes/health.route.js";
import roomRoute from "./routes/room.route.js";
import { createServer } from "http";
import { addUser, getUser, getUsersInRoom, removeUser } from "./utils/users.js";
import Message from "./models/Message.js";
import Room from "./models/room.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

app.use(express.json());
app.use(cors());
app.use("/health", healthRoute);
app.use("/room", roomRoute);

await connectDB();

io.on("connection", (socket) => {
  console.log("🔌 connected:", socket.id);

  socket.on("join", async ({ name, room }, callback) => {
    try {
      console.log("➡️ join:", { name, room, id: socket.id });

      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) {
        console.log("❌ addUser error:", error);
        return callback(error);
      }

      const roomData = await Room.findOne({ name: user.room });

      if (!roomData) return callback("Room not found");

      socket.join(user.room);
      console.log(`✅ ${user.name} joined room ${roomData.name}`);

      const previousMessages = await Message.find({ room: roomData._id }).sort({ createdAt: 1 }).lean();
      socket.emit("previousMessages", previousMessages);

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

  socket.on("sendMessage", async (message, callback) => {
    try {
      const user = getUser(socket.id);
      if (!user) return;

      const roomData = await Room.findOne({ name: user.room });
      if (!roomData) return callback("Room not found");

      const savedMessage = await Message.create({
        text: message,
        user: user.name,
        room: roomData._id,
      });

      if (savedMessage) console.log(`${savedMessage.text} Message has saved`);

      io.to(user.room).emit("message", { user: savedMessage.user, text: savedMessage.text, createdAt: savedMessage.createdAt });

      callback();
    } catch (error) {
      console.error("❌ sendMessage error:", error);
    }
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
