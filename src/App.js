import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/Merriweather-Regular.ttf';
import './css/footer.css'; // Import the CSS file for styling
import './css/homepage.css'; // Import the CSS file for styling
import './css/login.css';
import './css/propertyadd.css';
import './css/register.css';
import './css/propertydetail.css';
import './css/navbar.css';
import './css/message.css';
import { io } from 'socket.io-client';
import { Container } from '@mui/material';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from './components/NavBar';

function App() {
  const [socket, setSocket] = useState(null);
  const [ userId, setUserId] = useState(null);
  const [ username, setUsername] = useState(null);



  useEffect(() => {
    setSocket(io('http://localhost:5000'));
    const _userId = Cookies.get("userId");
    const username = localStorage.getItem("username");

    if(_userId) setUserId(_userId);
    if (username) setUsername(username);

    console.log(_userId);
}, []);

return (
  <div>
    <NavBar />
    <Outlet context={{socket, userId, username}}/>
    <Footer />
  </div>
  );
}

export default App;
