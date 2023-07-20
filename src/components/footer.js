import React from 'react';

function Footer () {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} SellBuy</p>
        <img src="Vector.png" className='footer-image' alt="Footer  Image" />
      </div>
    </footer>
  );
};

export default Footer;