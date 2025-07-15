// src/components/Admin/MiniChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', { transports: ['websocket'], path: '/socket.io' });

export default function MiniChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const endRef                  = useRef(null);

  useEffect(() => {
    socket.on('chatMessage', msg => {
      setMessages(m => [...m, msg]);
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => { socket.off('chatMessage'); };
  }, []);

  const send = () => {
    if (!input.trim()) return;
    socket.emit('chatMessage', input);
    setInput('');
  };

  return (
    <div className="card glass h-100 p-3 d-flex flex-column">
      <h5 className="mb-2">Mini Chat</h5>
      <div className="flex-grow-1 overflow-auto mb-2">
        {messages.map((m,i) => <div key={i}>{m}</div>)}
        <div ref={endRef}/>
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="btn btn-primary" onClick={send}>
          <FiSend />
        </button>
      </div>
    </div>
  );
}
