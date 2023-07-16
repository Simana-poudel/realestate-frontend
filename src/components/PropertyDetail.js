import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyDetail } from '../api';
import NavBar from './Navbar';
import { Modal } from 'reactstrap';

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const [data, setData] = useState([]);
  const [showViewDocumentModal, setShowViewDocumentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPropertyDetail() {
      try {
        const propertyData = await getPropertyDetail(propertyId);
        console.log(propertyData);
        setData(propertyData.data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchPropertyDetail();
  }, [propertyId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleViewDocument = () => {
    console.log("button is clicked");
    const userId = localStorage.getItem('userId');

    if (userId) {
      setShowViewDocumentModal(true);
    } else {
        // Save the current path in localStorage
        localStorage.setItem('redirectPath', window.location.pathname);

        // Show a message and provide a button to redirect to login page
        setShowLoginModal(true);
      }
    };


  const handleOfferProperty = () => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem('redirectPath', window.location.pathname);

    if (userId) {
    navigate('/offerproperty');
    } else {
      setShowLoginModal(true);
    }
  };
  
  const handleViewDocumentModalClose = () => {
    setShowViewDocumentModal(false);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    localStorage.removeItem('redirectPath');

  };

  const handleLoginModalConfirm = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  
  return (
    <div>
      <NavBar />
      {/* data : {JSON.stringify(data)} */}
      <h1>property:{data?.title}</h1>
      {data.propertyImage && data.propertyImage.length > 0 && (
  <img src={data.propertyImage[0].name} alt="PropertyImage" className="property-image col-md-6 col-sm-6" />
)}
      <p>Price: {data?.price}</p>
      <p>City: {data?.city}</p>

        <button onClick={handleViewDocument}> View Document</button>
        <button onClick={handleOfferProperty}> Offer property</button>

        {showViewDocumentModal  && (
           <div isOpen={showViewDocumentModal} onClose={handleViewDocumentModalClose} className="modal-overlay">
           <div className="modal-content">
             <h2>Property Document</h2>
             <img src="naksa.jpg" alt="Naksa" />
             <img src="lalpurja.jpg" alt="Lalpurja" />
             <button onClick={handleViewDocumentModalClose}>Close</button>
           </div>
        </div>
      )}

{showLoginModal && (
        <Modal isOpen={showLoginModal} onClose={handleLoginModalClose}>
          <h2>Login Required</h2>
          <p>You need to login first to view the property document.</p>
          <button onClick={handleLoginModalConfirm}>Go to Login</button>
          <button onClick={handleLoginModalClose}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default PropertyDetailPage;
