import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyDetail } from '../api';
import NavBar from './Navbar';

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(!showModal);
  };

  const handleOfferProperty = () => {
    console.log("offering a property");
    navigate('/offerproperty')
  }
  
  return (
    <div>
      <NavBar />
      {/* data : {JSON.stringify(data)} */}
      <h1>property:{data?.title}</h1>
      {/* {data.propertyImage && data.propertyImage.length > 0 && (
  <img src={data.propertyImage[0].name} alt="PropertyImage" className="property-image" />
)} */}
      <p>Price: {data?.price}</p>
      <p>City: {data?.city}</p>

        <button onClick={handleViewDocument}> View Document</button>
        <button onClick={handleOfferProperty}> Offer property</button>

        {showModal && (
           <div className="modal-overlay">
           <div className="modal-content">
             <h2>Property Document</h2>
             <img src="naksa.jpg" alt="Naksa" />
             <img src="lalpurja.jpg" alt="Lalpurja" />
             <button onClick={handleViewDocument}>Close</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
