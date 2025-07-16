import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

import { users, addedContacts } from './usersMap.js';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse JSON bodies

app.use('/api', router);

// Socket.IO setup with CORS handling
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? false // Same-origin in production
      : ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(frontendPath));

  app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}


// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('id', socket.id);
  socket.on('message', (data) => {
    io.to(users.getKey(data.for)).emit('message', {
      messageText: data.message,
      from: data.from,
    })
  })
  socket.on('disconnect', () => {
    const disconnectedUser = users.get(socket.id);
    addedContacts.get(disconnectedUser)?.forEach(user => {
      addedContacts.get(user)?.filter(u => u !== users.get(socket.id))
      io.to(users.getKey(user)).emit('leave', users.get(socket.id))
    });
    addedContacts.delete(disconnectedUser);
    users.delete(socket.id);
  })

});

router.post('/addUserRequest', (req, res) => {
  if (!users.hasValue(req.body.for)) {
    return res.json({
      success: false,
      message: "Username not exists"
    })
  }
  io.to(users.getKey(req.body.for)).emit('request', req.body.from);
  res.json({
    success: true,
    message: "Success"
  })
})

router.post('/addUserResponse', (req, res) => {
  if(!users.hasValue(req.body.for)){
   return res.json({
      success: false,
      message: 'User already Diconnected'
    })
  }
  if (req.body.status === 'accepted') {
    addedContacts.get(req.body.from).push(req.body.for);
    addedContacts.get(req.body.for).push(req.body.from);
  }
  io.to(users.getKey(req.body.for)).emit('response', { from: req.body.from, status: req.body.status });
  res.json({
    success: true,
    message: "Success"
  })
})

router.post('/login', (req, res) => {
  console.log(req.body);
  if (users.hasValue(req.body.username)) {
    return res.json({
      success: false,
      message: "Username already exists"
    });
  }
  users.set(req.body.id, req.body.username);
  addedContacts.set(req.body.username, []);
  res.json({
    success: true,
    message: "Success"
  });
});


server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});