import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (import.meta.env.PROD) {
    return window.location.origin; 
  } else {
    return 'http://localhost:5000'; 
  }
};

export const socket = io(getSocketUrl(), {
  autoConnect: true,
  reconnection: true,
  withCredentials: true
});
