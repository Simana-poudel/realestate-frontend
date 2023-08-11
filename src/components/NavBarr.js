import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal } from 'reactstrap';
import { createLogout } from '../api';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'js-cookie';


const NavBarr = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    
  const handleSellProperty = () => {
    const userId = Cookies.get('userId');

    if (userId) {
    navigate('/addproperty');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginModalConfirm = () => {
    setShowLoginModal(false);
    navigate('/login');
  };



    const handleLogout = async (e) => {
      try {
        const response = await createLogout();
        console.log({response: response});
      }

    catch (error) {
      console.error(error);
      throw(error?.response?.data?.error)
    }


      localStorage.clear(); // Remove the user ID from local storage
      Cookies.remove("userId");
      navigate('/');
    };
  
    const handleLogin = () => {

      navigate('/login');
    };

    const handleMessage =() => {
       
      navigate('/chats');
    };


    const userId = Cookies.get('userId'); // Get the user ID from local storage
    const username = localStorage.getItem('username');
    // const handleRegister = () => {
    //   navigate('/register');
    // };
    return ( 
     <Navbar className="navbar-expand-lg">
       <NavbarBrand className="navbar-brand ml-10 sellbuy" href="/">
       <img src="Vector.png" className='logo-image' />
       </NavbarBrand>
          <Nav className="nav-links">
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem>
            <div onClick={handleSellProperty}>
          <Link className="nav-link" >Sell</Link>
          </div>
          </NavItem>
          <NavItem><Link to="/searchproperty" className="nav-link">Buy</Link></NavItem>
          <NavItem><Link to="/aboutus" className="nav-link">About Us</Link></NavItem>
        <div className="cta-buttons">
          {userId ? ( // Check if user ID is present
           <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
           <DropdownToggle className="user-dropdown" caret>
           <FontAwesomeIcon icon={faUser} className='user-icon' />
           </DropdownToggle>
           <DropdownMenu>
             <DropdownItem header>{username}</DropdownItem>
             <DropdownItem divider />
             <DropdownItem onClick={handleMessage}>Message</DropdownItem>
             <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
           </DropdownMenu>
         </Dropdown>
       ) : (
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>

        {showLoginModal && (
            <Modal className='modal-login-container' isOpen={showLoginModal} onClose={handleLoginModalClose}>
            <h2 className='modal-login-title'>Login Required</h2>
            <p className='modal--login-content'>You need to login first.</p>
            <button className='button' onClick={handleLoginModalConfirm}>Go to Login</button>
            <button className='modal-login-button' onClick={handleLoginModalClose}>Close</button>
            </Modal>
          )}
        </Nav>
      </Navbar>
    );
  };

  export default NavBarr;