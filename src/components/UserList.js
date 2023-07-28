import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { List, ListItem, ListItemText } from '@mui/material';
import { Col, Row } from 'reactstrap';
import Message from './Message';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Room from './Room';

function UserList() {
const roomId = uuidv4();

  return (
    <div>
      <Row>
        <Col md="3">
          <List sx={{backgroundColor:"background.paper"}} component="nav" aria-label="mailbox folders">
            <Link sx={{testDecoration:"none"}} to={`/room/${roomId}`}>
            <ListItem button divider >
              <ListItemText primary="chat1" />
            </ListItem>
            </Link>
            <ListItem  button divider>
              <ListItemText primary="chat2" />
            </ListItem>
            <ListItem button divider >
              <ListItemText primary="chat3" />
            </ListItem>
            <ListItem button divider >
              <ListItemText primary="chat4" />
            </ListItem>
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
