import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyDetail, fixMeetingWithSeller } from '../api';
import NavBar from './Navbar';
import { Col, Container, Modal, Row } from 'reactstrap';
import IconPage from './IconPage';
import { faBuilding } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import BriefCharacter from './BriefCharacter';
import Footer from './footer';

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const [data, setData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showViewDocumentModal, setShowViewDocumentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPropertyDetail() {
      try {
        const propertyData = await getPropertyDetail(propertyId);
        console.log(propertyData);
        setData(propertyData.data);
        localStorage.setItem('user-email', data.user.email);
        localStorage.setItem('url', window.location.href);

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

  const handleNextImage = () => {
setCurrentImageIndex((prevIndex) => (prevIndex +1)% data?.propertyImage?.length);
console.log();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
    prevIndex === 0 ? data.propertyImage.length - 1 : prevIndex - 1);
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

  const handlefixMeeting = async () => {
    const userId = localStorage.getItem('userId');
    localStorage.setItem('redirectPath', window.location.pathname);

    if (userId) {
      localStorage.setItem('propertyId', data._id);

      // Prepare the data to pass to the fixMeetingWithSeller function
      const dataForMeeting = {
        email: localStorage.getItem('user-email'),
        url: window.location.href,
      };

      // Call the fixMeetingWithSeller function with the data
      try {
        await fixMeetingWithSeller(dataForMeeting);
        // Optionally, you can show a success message to the user
      } catch (error) {
        console.error(error);
        // Handle any errors that might occur during the API call
        // You can display an error message to the user if needed
      }
    } else {
      setShowLoginModal(true);
    }
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
            <div className='main-image-wrapper'>
            <FontAwesomeIcon
             icon={faArrowAltCircleLeft} 
             size="2x" 
             className='arrow-icon'
             onClick={handlePrevImage} 
             />

            <img src={data.propertyImage[currentImageIndex].name} 
            alt="PropertyImage" 
            className="property-image" 
            />

            <FontAwesomeIcon 
            icon={faArrowAltCircleRight} 
            size="2x" 
            className='arrow-icon'
            onClick={handleNextImage} 
            />

            </div>
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
          <button onClick={handlefixMeeting} className='button meeting-button'>Fix a Meeting</button>
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
            <div className='user-info-container'>
              <p className='user-info'>Seller Information</p>
                  <p>Email: {data?.user?.email}</p>
                  <p>Contact: {data?.user?.contact}</p>
                  <p>Name: {data?.user?.name}</p>
                </div>
      </Col>
      </Row>
    </Container>
    <Footer />
    {showViewDocumentModal  && (
              <div className={`modal-overlay ${showViewDocumentModal ? "active" : ""}`} onClick={handleViewDocumentModalClose}>
            <div className="modal-content">
            <h2>Property Document</h2>
            <div className='document-wrapper'>
              <p>Naksa</p>
              <img src="naksa.jpg" alt="Naksa" className='document-image' />
            </div>
            <div className='document-wrapper'>
              <p>Lalpurja</p>
              <img src="lalpurja.jpg" alt="Lalpurja" className='document-image' />
            </div>
            <button className='button' onClick={handleViewDocumentModalClose}>Close</button>
            </div>
            </div>
          )}
  </div>
  );
};

export default PropertyDetailPage;
