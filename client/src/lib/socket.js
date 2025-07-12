import { io } from 'socket.io-client';

// Determine connection URL
const getSocketUrl = () => {
  if (import.meta.env.PROD) {
    return window.location.origin; // Same as frontend in production
  } else {
    return 'http://localhost:5000'; // Backend server in dev
  }
};

export const socket = io(getSocketUrl(), {
  autoConnect: true,
  reconnection: true,
  withCredentials: true
});