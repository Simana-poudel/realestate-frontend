import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Box, Button, Card,IconButton, InputAdornment, InputLabel,OutlinedInput,Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function UserMessage() {
  const { socket } = useOutletContext();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false); 
  const {roomId} = useParams();
  const {ownername} = useParams();
  const fileRef = useRef();
  const navigate = useNavigate();

  function handleFileClick() {
    fileRef.current.click();
  }

  function fileSelected(e) {
    const file = e.target.files[0];
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (() => {
      const data = reader.result;
      socket.emit('upload', { data, roomId });
      setChat((prev) => [
        ...prev,
        {message: reader.result, received: false, type: "image"},
      ]);    });

  }

  useEffect(() => {
    if(!socket) return;

      socket.on("message-from-server", ({message}) => {
        setChat((prev) => [...prev, {message: message, received: true}]);
     });

     socket.on("uploaded", (data) => {
      setChat((prev) => [
        ...prev,
        {message: data.buffer, received: true, type: "image"},
      ]);

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

    const handleDeleteRoom = (e) => {
      try{
        socket.emit('room-removed', {roomId});
      }
      catch (error) {
        console.error(error);
        throw(error?.response?.data?.error)
      }
      navigate('/chats');
    };


  return (
    <div>
          <Box sx={{display:'flex', justifyContent:"center"}}>
          <Card sx={{padding:2, marginTop:10, width: "100%", backgroundColor:"gray"}}>
           
            <Box sx={{display:'flex', justifyContent:"space-between"}} >
            {
              roomId && <Typography> Room : {roomId}</Typography>
            }
            {
              roomId && 
              <Link to={'/chats'}>
              <Button onClick={handleDeleteRoom} sx={{color:"white"}} variant='text'>Delete Room</Button>
              </Link>
            }
            </Box>

            {
              ownername && <Typography> Messeging with : {ownername}</Typography>
            }


            <Box sx={{marginBottom: 5}}>
            {chat.map((data, index) => 
              data.type === 'image' ? (

                <img style={{float: data.received ? "left" :"right"}}
                key={index} src={data.message}
                alt='my-image' 
                width="200" />
              ) : (

              <Typography sx={{textAlign: data.received ? "left" :"right"}} key={index}>
                {data.message}
                </Typography>
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
                    <input onChange={fileSelected} ref={fileRef} type='file' style={{display: "none"}} />
                    <IconButton
                      type="button"
                      edge="end"
                      sx= {{ marginRight: 1 }}
                      onClick={handleFileClick}
                    >
                      <AttachFileIcon />
                    </IconButton>

                    <IconButton
                      type="submit"
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

export default UserMessage;
