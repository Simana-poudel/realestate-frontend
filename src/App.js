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
// import { io } from 'socket.io-client';
import { Container } from '@mui/material';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBarr from './components/NavBarr';
import ChatProvider from './Context/ChatProvider';

function App() {
  // const [socket, setSocket] = useState(null);
  const [ userId, setUserId] = useState(null);
  const [ username, setUsername] = useState(null);



  useEffect(() => {
    const _userId = Cookies.get("userId");
    const username = localStorage.getItem("username");

    if(_userId) setUserId(_userId);
    if (username) setUsername(username);

    console.log(_userId);
}, []);

return (
<ChatProvider>
  <div>
    <NavBarr />
    <Outlet context={{ userId, username}}/>
    <Footer />
  </div>
</ChatProvider>
  );
}

export default App;
