// Set up the Express Server
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// Add Socket.io server around the app server
const { Server } = require("socket.io");
const io = new Server(server);

// Set up the basic app routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Set up the socket.io functions
io.on("connection", (socket) => {
  // Let us know when a user connects
  console.log("A user connected");
  // Let us know when a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  // Let us know when a user sends a message
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);
    // Emit the message to everyone currently connected!
    io.emit('chat message', msg)
  })
});

// Listen for the port
server.listen(3000, () => {
  // Let me know the app is actually listening on the port
  console.log("listening on localhost:3000");
});
