import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOfferedProperty, fixMeetingWithSeller } from '../api';
import NavBar from './NavBar';
import { Modal } from 'reactstrap';

const OfferPropertyDetailPage = () => {
  const { offerpropertyId } = useParams();
  const [data, setData] = useState([]);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPropertyDetail() {
      try {
        const offerpropertyData = await getOfferedProperty(offerpropertyId);
        console.log(offerpropertyData);
        setData(offerpropertyData.data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchPropertyDetail();
  }, [offerpropertyId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleAddDocument = () => {
    console.log("button is clicked");

    setShowAddDocumentModal(true);

    };


  const handleFixMeeting = async(e) => {
    e.preventDefault();
    localStorage.setItem('url', window.location.pathname);
    const url = localStorage.getItem('url');
    const email = localStorage.getItem('email');

    const data = {
        url,
        email
    };

    try{
        const response = await fixMeetingWithSeller(data);
        console.log({response: response});
    }
    catch (error) {
        console.error(error);
    }    
  };
  
  const handleAddDocumentModalClose = () => {
    setShowAddDocumentModal(false);
  };


  
  return (
    <div>
      {/* data : {JSON.stringify(data)} */}
      <div className='container'>
      <h1 className='property-title'>property:{data?.title}</h1>
      {data.propertyImage && data.propertyImage.length > 0 && (
  <img src={data.propertyImage[0].name} alt="PropertyImage" className="property-image col-md-6 col-sm-6" />
)}
      <p className='property-price'>Price: {data?.price}</p>
      <p className='property-city'>City: {data?.city}</p>

        <button onClick={handleAddDocument}> Add Document</button>
        <button onClick={handleFixMeeting}> Fix meeting</button>

        {showAddDocumentModal  && (
           <div isOpen={showAddDocumentModal} onClose={handleAddDocumentModalClose} className="modal-overlay">
           <div className="modal-content">
             <h2> Add Property Document</h2>
             <img src="naksa.jpg" alt="Naksa" />
             <img src="lalpurja.jpg" alt="Lalpurja" />
             <button onClick={handleAddDocumentModalClose}>Close</button>
           </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default OfferPropertyDetailPage;
