import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
  },
});

// storing online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log(`User connected!`, socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  // emit is used to broadcast events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log(`User Disconnected`, socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export function getReiverSocketId(userId) {
  return userSocketMap[userId];
}

export { app, io, server };
