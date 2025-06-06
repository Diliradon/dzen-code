const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let activeSessions = 0;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('userConnected', () => {
    activeSessions++;
    console.log(`User connected. Active sessions: ${activeSessions}`);
    
    // Broadcast the updated count to all clients
    io.emit('activeSessionsCount', activeSessions);
  });

  socket.on('userDisconnected', () => {
    activeSessions = Math.max(0, activeSessions - 1);
    console.log(`User disconnected. Active sessions: ${activeSessions}`);
    
    // Broadcast the updated count to all clients
    io.emit('activeSessionsCount', activeSessions);
  });

  socket.on('disconnect', () => {
    activeSessions = Math.max(0, activeSessions - 1);
    console.log(`User disconnected (auto). Active sessions: ${activeSessions}`);
    
    // Broadcast the updated count to all clients
    io.emit('activeSessionsCount', activeSessions);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
}); 