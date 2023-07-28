import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { io } from 'socket.io-client';
import { Box, Button, Card, Container, Divider, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemText, OutlinedInput, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Col, Row } from 'reactstrap';

function Message() {
  const { socket } = useOutletContext();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false); 
  const {roomId} = useParams();


  useEffect(() => {
    if(!socket) return;

      socket.on("message-from-server", ({message}) => {
        setChat((prev) => [...prev, {message: message, received: true}]);
     });

     socket.on("typing-from-server", () => {
      setTyping(true);
    });

    socket.on("typing-stopped-from-server", () => {
      setTyping(false);
    });

  }, [socket]);


    function handleForm(e) {
      e.preventDefault();
      socket.emit('send-message', {message, roomId});
      setChat((prev) => [...prev, {message, received: false}]);
      setMessage('');
    };

    const [typingtimeout, setTypingtimeout] = useState(null);

    function handleInput (e) {
      setMessage(e.target.value);
      socket.emit('typing', {roomId});

      if (typingtimeout) clearTimeout(typingtimeout) //debounce effect

      setTypingtimeout(setTimeout(() => {
        socket.emit('typing-stopped', {roomId});
      }, 1000));
    };

  return (
    <div>
          <Box sx={{display:'flex', justifyContent:"center"}}>
          <Card sx={{padding:2, marginTop:10, width: "100%", backgroundColor:"gray"}}>
            {
              roomId && <Typography> Room : {roomId}</Typography>
            }

            <Box sx={{marginBottom: 5}}>
            {chat.map((data) => (
              <Typography sx={{textAlign: data.received ? "left" :"right"}} key={data.message}>{data.message}</Typography>
            ))}
            </Box>
          <Box component="form" onSubmit={handleForm}>
            {
              typing && (

            <InputLabel sx={{color:"white"}} shrink htmlFor="message-input">Typing...</InputLabel>
              )}
              <OutlinedInput
               sx={{backgroundColor:"white", width:"100%"}}
                placeholder="Write your message" 
                id='message-input'
                value={message}
                onChange={handleInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Write your message"
              />
          </Box> 
          </Card>
          </Box>

   </div>
  );
}

export default Message;
