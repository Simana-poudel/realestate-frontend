import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Col, Row } from 'reactstrap';
import Message from './Message';
import { Link, useOutletContext, useParams } from 'react-router-dom';

function Room() {
    const params = useParams();
    const {socket} = useOutletContext();

    useEffect (() => {
        if(!socket) return;
        socket.emit("join-room", {roomId: params.roomId});
    }, [socket]);

  return (
    <div>
     <Message />
   </div>
  );
}

export default Room;
