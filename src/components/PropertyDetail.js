import React, { useEffect, useState } from 'react';
import { useNavigate, useParams,useOutletContext } from 'react-router-dom';
import { getPropertyDetail, fixMeetingWithSeller } from '../api';
import { Col, Container, Modal, Row } from 'reactstrap';
import { faBuilding } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import BriefCharacter from './BriefCharacter';
import LeafletLocation from './LeafletLocation';
import MessageOutlined from '@mui/icons-material/MessageOutlined';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const [data, setData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showViewDocumentModal, setShowViewDocumentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const roomId = uuidv4();
  const Ownername = data?.user?.name;
  const { socket, userId } = useOutletContext();
  const username = localStorage.getItem("username")
  const [showFixMeetingConfirmationModal, setShowFixMeetingConfirmationModal] = useState(false);




  useEffect(() => {
    window.scrollTo(0, 0)

    async function fetchPropertyDetail() {
      try {
        const propertyData = await getPropertyDetail(propertyId);
        setData(propertyData.data);
        console.log(propertyData);
        console.log(data?.user?.email);
        
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
    const userId = Cookies.get('userId');

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
    const userId = Cookies.get('userId');
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

  const handleFixMeeting = async () => {
    const userId = Cookies.get('userId');
    localStorage.setItem('redirectPath', window.location.pathname);
    localStorage.setItem('user-email', data?.user?.email);

    if (userId) {
      localStorage.setItem('propertyId', data._id);

      // Prepare the data to pass to the fixMeetingWithSeller function
      const dataForMeeting = {
        email: localStorage.getItem('user-email'),
        url: window.location.href,
        contact: localStorage.getItem('user-contact'),
        name: localStorage.getItem('username')
      };

      // Call the fixMeetingWithSeller function with the data
      try {
        await fixMeetingWithSeller(dataForMeeting);
        setShowFixMeetingConfirmationModal(false);

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

  // //creating new room
  // function createNewRoom () {
  //   console.log(Ownername);
  //   // navigate(`/room/${roomId}/${Ownername}`);
  //   const userId = Cookies.get('userId');

  //   if (userId) {
  //     navigate(`/room/${roomId}/${Ownername}`);
  //     socket.emit('new-room-created', { roomId, userId, Ownername ,username });

  //   } else {
  //       // Save the current path in localStorage
  //       localStorage.setItem('redirectPath', window.location.pathname);

  //       // Show a message and provide a button to redirect to login page
  //       setShowLoginModal(true);
  //     }

  // }

  const handleShowFixMeetingConfirmationModal = () => {
    setShowFixMeetingConfirmationModal(true);
  };

  const handleCloseFixMeetingConfirmationModal = () => {
    setShowFixMeetingConfirmationModal(false);
  };

  
  return (
    <div>
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
          <button onClick={handleShowFixMeetingConfirmationModal} className='button meeting-button'>Fix a Meeting</button>
          </div>
          <div className='description'>
            {data?.description} 
          </div>
          <div className='property-address'>
          <h1 className='descriptionTitle'>Property Details</h1> 
              <div className='description'>
                <Row>
                  <Col md='6'>
                <div><span className='dataTitle'>No of Rooms:</span> <span className='data'>{data?.district}</span></div>
                <div><span className='dataTitle'>No of Floors:</span> <span className='data'>{data?.noOfFloors}</span></div>
                <div><span className='dataTitle'>Parking Space:</span> <span className='data'>{data?.parkingSpace}</span></div>
                <div><span className='dataTitle'>Dining Rooms:</span> <span className='data'>{data?.diningRoom}</span></div>

                  </Col>
                  <Col md='6'>
                <div><span className='dataTitle'>Kitchen:</span> <span className='data'>{data?.kitchen}</span></div>
                <div><span className='dataTitle'>Bedroom:</span> <span className='data'>{data?.bedroom}</span></div>
                <div><span className='dataTitle'>Hall:</span> <span className='data'>{data?.hall}</span></div>
                <div><span className='dataTitle'>Bathroom:</span> <span className='data'>{data?.bathroom}</span></div>

                  </Col>
                </Row>
                </div>
          </div>


          <div className='property-address'>
          <h1 className='descriptionTitle'>Property Address</h1> 
              <div className='description'>
                <Row>
                  <Col md='6'>
                <div><span className='dataTitle'>District:</span> <span className='data'>{data?.district}</span></div>
                {data.coordinates && data.coordinates.length > 0 && (
                <div><span className='dataTitle'>Latitude:</span> <span className='data'>{data?.coordinates[0]}</span></div>
                )}
                  </Col>
                  <Col md='6'>
                <div><span className='dataTitle'>City:</span> <span className='data'>{data?.city}</span></div>
                {data.coordinates && data.coordinates.length > 0 && (
                <div><span className='dataTitle'>Longitude:</span> <span className='data'>{data?.coordinates[1]}</span></div>
                )}
                  </Col>
                </Row>
                </div>
          </div>

          <div className='location'>Location
          <div>
          <LeafletLocation coordinates={data?.coordinates} />
          </div>
          </div>

          {showLoginModal && (
            <Modal isOpen={showLoginModal} onClose={handleLoginModalClose}>
            <h2>Login Required</h2>
            <p>You need to login first.</p>
            <button className='button' onClick={handleLoginModalConfirm}>Go to Login</button>
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
            <div className='user-info-container'>
              <p className='user-info'>Chat with {data?.user?.name} Now </p>
                <p>
                  Click here to start a conversation:
                  <MessageOutlined />
                </p>
            </div>
            
      </Col>
      </Row>
    </Container>
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

          {/* Fix Meeting Confirmation Modal */}
      {showFixMeetingConfirmationModal && (
        <Modal isOpen={showFixMeetingConfirmationModal} onClose={handleCloseFixMeetingConfirmationModal}>
          <h2>Do you want to send a message to the seller?</h2>
          <button className='button' onClick={handleFixMeeting}>Yes</button>
          <button onClick={handleCloseFixMeetingConfirmationModal}>Cancel</button>
        </Modal>
      )}
  </div>
  );
};

export default PropertyDetailPage;
