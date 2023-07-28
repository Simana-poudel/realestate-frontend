import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/Merriweather-Regular.ttf';
import './css/footer.css'; // Import the CSS file for styling
import './css/homepage.css'; // Import the CSS file for styling
import './css/login.css';
import './css/propertyadd.css';
import './css/register.css';
import './css/propertydetail.css'
import './css/navbar.css';
import './css/message.css';
import { io } from 'socket.io-client';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    setSocket(io('http://localhost:5000')); // Replace with your server URL
}, []);

return (
    <Container>
      <NavBar />
      <Outlet context={{socket}}/>
      <Footer />
    </Container>
  );
}

export default App;
