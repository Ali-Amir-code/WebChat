import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Socket.IO setup with CORS handling
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? false // Same-origin in production
      : 'http://localhost:5173', // Vite dev server
    credentials: true
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../dist');
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Received:', data);
    io.emit('message', `Server: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});