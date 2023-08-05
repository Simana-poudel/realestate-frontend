import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Button, Col, Row } from 'reactstrap';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import { getrooms } from '../api';

function UserList() {
  const navigate = useNavigate();
  const { socket, userId } = useOutletContext();
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);


console.log(userId);
  useEffect(() => {
    async function getRoomsData() {
      const room = await getrooms();
      console.log({ room });
      setRooms(room.data);
    }
    getRoomsData()
  }, []);


  useEffect(() => {
    if (!socket) return;

    // Join the current room based on the roomId from URL params
    socket.emit('join-room', { roomId });

    // Cleanup function to leave the current room when the component unmounts
    return () => {
      socket.emit('leave-room', { roomId });
    };
  }, [socket, roomId]);


  function createNewRoom() {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    socket.emit('new-room-created', { roomId, userId });
    // setRooms([...rooms, {roomId, name: "Test", _id: "testId"}]);

  }


  useEffect(() => {
    if (!socket) return;

    socket.on('new-room-created', ({room}) => {
      setRooms((prevRooms) => [...prevRooms, room]);
    });
    socket.on('room-removed', ({ roomId }) => {
      setRooms(rooms.filter((room) => room.roomId !== roomId ));
    });


    return () => {
      // Clean up the socket listeners when the component unmounts
      socket.off('new-room-created');
      socket.off('room-removed');
    };
  
  }, [socket]);


  return (
    <div>
      <Row>
        <Col md="3">
       
        {
            rooms.map((room) => (
            <Link key={room._id} sx={{testDecoration:"none"}} to={`/room/${room.roomId}`}>
            <Button variant= 'text'>
               {room.name}
            </Button>
            </Link>
            ))
           }
            
            <List sx={{backgroundColor:"background.paper"}} component="nav" aria-label="mailbox folders">
           {
            userId && 
            <ListItem button divider onClick={createNewRoom} >
              <ListItemText primary="New chat" />
            </ListItem>
           }

          </List>
        </Col>

        <Col md="9">
        <Message />
        </Col>
      </Row>
   </div>
  );
}

export default UserList;
