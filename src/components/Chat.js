import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Button, Col, Row } from 'reactstrap';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getUsers } from '../api';
import UserMessage from './UserMessage';


function Chat() {
  const navigate = useNavigate();
  const { socket, userId } = useOutletContext();
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

console.log(userId);
  useEffect(() => {
    async function getUserData() {
        try {
            const response = await getUsers();
            const users = response.data.results;

      // Ensure the users data is an array before filtering
        if (Array.isArray(users)) {
          const filteredUsers = users.filter((user) => user._id !== userId);
          setFilteredUsers(filteredUsers);

        } else {
          console.log('Users data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    console.log(filteredUsers);
    getUserData();
  }, [userId]);

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
            {filteredUsers.map((user) => (
            <div key={user._id}>
            {/* Display user information as needed */}

            <Link key={user._id} sx={{testDecoration:"none"}}>
            <Button variant= 'text'>
               {user.name}
            </Button>
            </Link>
            </div>
            ))}
        {/* {
            rooms.map((room) => (
            <Link key={room._id} sx={{testDecoration:"none"}} to={`/room/${room.roomId}`}>
            <Button variant= 'text'>
               {room.name}
            </Button>
            </Link>
            ))
           } */}
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
        <UserMessage />
        </Col>
      </Row>
   </div>
  );
}

export default Chat;
