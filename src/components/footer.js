import React from 'react';

function Footer () {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} SellBuy</p>
        <img src="logo1.png" className='footer-image' />
      </div>
    </footer>
  );
};

export default Footer;