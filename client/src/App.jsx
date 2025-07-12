import { useState, useEffect } from 'react';
import { socket } from './lib/socket';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>Socket.IO Demo</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;