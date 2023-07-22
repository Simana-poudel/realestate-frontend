import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { createLogout } from '../api';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';

const NavBar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
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
      navigate('/');
    };
  
    const handleLogin = () => {

      navigate('/login');
    };

    const userId = localStorage.getItem('userId'); // Get the user ID from local storage
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
          <NavItem><Link to="/addproperty" className="nav-link">Sell</Link></NavItem>
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
             <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
           </DropdownMenu>
         </Dropdown>
       ) : (
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
        </Nav>
      </Navbar>
    );
  };

  export default NavBar;