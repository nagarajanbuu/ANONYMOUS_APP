const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Handle WebRTC signaling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When a user creates or joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    const users = io.sockets.adapter.rooms.get(roomId);
    
    console.log(`User ${socket.id} joined room ${roomId}`);
    
    // Notify others in the room
    if (users.size > 1) {
      socket.to(roomId).emit("user-joined", socket.id);
    }
  });

  // Handle WebRTC Offer
  socket.on("offer", (data) => {
    socket.to(data.target).emit("offer", { sender: data.sender, offer: data.offer });
  });

  // Handle WebRTC Answer
  socket.on("answer", (data) => {
    socket.to(data.target).emit("answer", { sender: data.sender, answer: data.answer });
  });

  // Handle ICE Candidates
  socket.on("ice-candidate", (data) => {
    socket.to(data.target).emit("ice-candidate", { sender: data.sender, candidate: data.candidate });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
