import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyDetail } from '../api';
import NavBar from './Navbar';
import { Col, Container, Modal, Row } from 'reactstrap';
import IconPage from './IconPage';
import { faBuilding } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import BriefCharacter from './BriefCharacter';

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
    localStorage.setItem('propertyId', data._id);

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
      <Container>
      <h1 className='property-title'>{data?.title}</h1>
      <Row>
        <Col md="8">
          {data.propertyImage && data.propertyImage.length > 0 && (
            <img src={data.propertyImage[0].name} alt="PropertyImage" className="property-image" />
          )}
          <Row>
            <Col md="9">
          <div className='iconwithbody'>
            <FontAwesomeIcon icon={faBuilding} size="2x" className='icon' />
            <span className='propertyType'> {data?.propertyType}</span>
            <FontAwesomeIcon icon={faLocationDot} size="2x" className='icon' />

            <span className='propertyType'> {data?.city}</span>
          </div>
          <div className='button-wrapper'>   
          <button onClick={handleOfferProperty} className='button offer-button'>Make an Offer</button>
          <button onClick={handleOfferProperty} className='button meeting-button'>Fix a Meeting</button>
          </div>
          <div className='description'>
            {data?.description} Eiusmod fugiat officia occaecat sint ullamco veniam voluptate sunt. Dolore incididunt nulla aliquip tempor dolor laboris dolore duis consequat sit sint ut ipsum. Adipisicing ad voluptate consequat ipsum magna in laborum deserunt.
          </div>
          <div className='location'>Location</div>

          {showLoginModal && (
            <Modal isOpen={showLoginModal} onClose={handleLoginModalClose}>
            <h2>Login Required</h2>
            <p>You need to login first to view the property document.</p>
            <button onClick={handleLoginModalConfirm}>Go to Login</button>
            <button onClick={handleLoginModalClose}>Close</button>
            </Modal>
          )}
          </Col>
          </Row>
      </Col>
      <Col md ="4">
      <BriefCharacter data={data}/>
            <div className='view-document'>
            <button className='button' onClick={handleViewDocument}> View Document</button>
            </div>
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
      </Col>
      </Row>
    </Container>
    <IconPage />
  </div>
  );
};

export default PropertyDetailPage;
