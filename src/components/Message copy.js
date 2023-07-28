import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000'); // Replace with your server URL

const Message = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageArea, setMessageArea] = useState(null);

  const name = localStorage.getItem('username'); // Get the user ID from local storage

    useEffect(() => {
      socket.on('message', (msg) => {
        appendMessage(msg, 'incoming');
        scrollToBottom();
      });

     // Clean up the event listener when the component is unmounted
  return () => {
    socket.off('message');
  };
}, []);


    const sendMessage = () => {
      if (message.trim() !== '') {
        let msg = {
          user: name,
          message: message.trim(),
        };
        appendMessage(msg, 'outgoing');
        setMessage('');
        scrollToBottom();
        socket.emit('message', msg);
      }
    };
  
    const appendMessage = (msg, type) => {
      setMessages((prevMessages) => [...prevMessages, { ...msg, type }]);
    };
  
    const scrollToBottom = () => {
      if (messageArea) {
        messageArea.scrollTop = messageArea.scrollHeight;
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };

  return (
    <div>
      <NavBar />
      <div className="message-container">
        <Row>
          <Col md="3">
            
          </Col>


          <Col md="9">
          <section className="chat__section">
          <div className="brand">
          <h1>Wassup</h1>
        </div>
        <div className="message__area">
            {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <h4>{msg.user}</h4>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div>
          <textarea
            id="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            cols="30"
            rows="1"
            placeholder="Write a message..."
          />
        </div>
        </section>

          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Message;
