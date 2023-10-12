import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOfferedProperty, fixMeetingWithSeller } from '../api';
import NavBar from './NavBarr';
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
      <h1 className='property-title'>Offer Property:{data?.title}</h1>
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


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams,useOutletContext, Link } from 'react-router-dom';
// import { getPropertyDetail, fixMeetingWithSeller, addPropertyDocument, getPropertyDocument } from '../api';
// import { Col, Container, Modal, Row } from 'reactstrap';
// import { faBuilding } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowAltCircleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
// import BriefCharacter from './BriefCharacter';
// import LeafletLocation from './LeafletLocation';
// import MessageOutlined from '@mui/icons-material/MessageOutlined';
// import { v4 as uuidv4 } from 'uuid';
// import Cookies from 'js-cookie';
// import { ChatState } from '../Context/ChatProvider';

// const OfferPropertyDetailPage = () => {
//   const [data, setData] = useState([]);
//   const [documentData, setDocumentData] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showViewDocumentModal, setShowViewDocumentModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [owner, setOwner] = useState('');
//   const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
//   const [documentImage, setDocumentImage] = useState([]);
//   const [naksaImage, setNaksaImage] = useState(null);
//   const [lalpurjaImage, setLalpurjaImage] = useState(null);
//   const [documentId, setDocumentId] = useState('');
//   const navigate = useNavigate();
//   const { offerpropertyId } = useParams();


//   useEffect(() => {
//     window.scrollTo(0, 0)

//     async function fetchPropertyDetail() {
//             try {
//               const offerpropertyData = await getOfferedProperty(offerpropertyId);
//               console.log(offerpropertyData);
//               setData(offerpropertyData.data);
//               console.log(data)
//             } catch (error) {
//               console.error(error);
//             }
//           }
      
//           fetchPropertyDetail();
//         }, [offerpropertyId]);



//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   const handleNextImage = () => {
// setCurrentImageIndex((prevIndex) => (prevIndex +1)% data?.propertyImage?.length);
// console.log();
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//     prevIndex === 0 ? data.propertyImage.length - 1 : prevIndex - 1);
//   };
  
//   const handleViewDocumentModalClose = () => {
//     setShowViewDocumentModal(false);
//   };

//   const handleAddDocument = () => {
//     setShowAddDocumentModal(true);
//   };

//   const handleAddDocumentClose = () => {
//     setShowAddDocumentModal(false);
//   };

  

//   const handleFixMeeting = async(e) => {
//         e.preventDefault();
//         localStorage.setItem('url', window.location.pathname);
//         const url = localStorage.getItem('url');
//         const email = localStorage.getItem('email');
    
//         const data = {
//             url,
//             email
//         };
    
//         try{
//             const response = await fixMeetingWithSeller(data);
//             console.log({response: response});
//         }
//         catch (error) {
//             console.error(error);
//         }    
//       };

  

//   const handleDocumentSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       documentImage.forEach((image, index) => {
//         formData.append('testImage', image);
//       });

//       formData.append('propertyId', data._id);

//       await addPropertyDocument(formData);
//       // Handle success, e.g., show a success message
//       handleAddDocumentClose();
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error(error);
//     }
//   };

  
//   return (
//     <div>
//       {/* data : {JSON.stringify(data)} */}
//       <Container>
//       <h1 className='property-title'>{data?.title}</h1>
//       <Row>
//         <Col md="8">
//           {data.propertyImage && data.propertyImage.length > 0 && (
//             <div className='main-image-wrapper'>
//             <FontAwesomeIcon
//              icon={faArrowAltCircleLeft} 
//              size="2x" 
//              className='arrow-icon'
//              onClick={handlePrevImage} 
//              />

//             <img src={data.propertyImage[currentImageIndex].name} 
//             alt="PropertyImage" 
//             className="property-image" 
//             />

//             <FontAwesomeIcon 
//             icon={faArrowAltCircleRight} 
//             size="2x" 
//             className='arrow-icon'
//             onClick={handleNextImage} 
//             />

//             </div>
//           )}

//           <Row>
//             <Col md="9">
//           <div className='iconwithbody'>
//             <FontAwesomeIcon icon={faBuilding} size="2x" className='icon' />
//             <span className='propertyType'> {data?.propertyType}</span>
//             <FontAwesomeIcon icon={faLocationDot} size="2x" className='icon' />

//             <span className='propertyType'> {data?.city}</span>
//           </div>
//           <div className='button-wrapper'>
          
//           {
//         ( userId && userId === owner) ?(
//           <></>
//         ):(
//           <button onClick={handleOfferProperty} className='button offer-button'>Make an Offer</button>

//         )  
//        }

//        { (userId && userId !== owner) && 
//         <button onClick={handleShowFixMeetingConfirmationModal} className='button meeting-button'>Fix a Meeting</button>

//        }

//           </div>
//           <div className='description'>
//             {data?.description} 
//           </div>
//           <div className='property-address'>
//           <h1 className='descriptionTitle'>Property Details</h1> 
//               <div className='description'>
//                 <Row>
//                   <Col md='6'>
//                 <div><span className='dataTitle'>No of Rooms:</span> <span className='data'>{data?.rooms}</span></div>
//                 <div><span className='dataTitle'>No of Floors:</span> <span className='data'>{data?.noOfFloors}</span></div>
//                 <div><span className='dataTitle'>Parking Space:</span> <span className='data'>{data?.parkingSpace}</span></div>
//                 <div><span className='dataTitle'>Dining Rooms:</span> <span className='data'>{data?.diningRoom}</span></div>

//                   </Col>
//                   <Col md='6'>
//                 <div><span className='dataTitle'>Kitchen:</span> <span className='data'>{data?.kitchen}</span></div>
//                 <div><span className='dataTitle'>Bedroom:</span> <span className='data'>{data?.bedroom}</span></div>
//                 <div><span className='dataTitle'>Hall:</span> <span className='data'>{data?.hall}</span></div>
//                 <div><span className='dataTitle'>Bathroom:</span> <span className='data'>{data?.bathroom}</span></div>

//                   </Col>
//                 </Row>
//                 </div>
//           </div>


//           <div className='property-address'>
//           <h1 className='descriptionTitle'>Property Address</h1> 
//               <div className='description'>
//                 <Row>
//                   <Col md='6'>
//                 <div><span className='dataTitle'>District:</span> <span className='data'>{data?.district}</span></div>
//                 {data.coordinates && data.coordinates.length > 0 && (
//                 <div><span className='dataTitle'>Latitude:</span> <span className='data'>{data?.coordinates[0]}</span></div>
//                 )}
//                   </Col>
//                   <Col md='6'>
//                 <div><span className='dataTitle'>City:</span> <span className='data'>{data?.city}</span></div>
//                 {data.coordinates && data.coordinates.length > 0 && (
//                 <div><span className='dataTitle'>Longitude:</span> <span className='data'>{data?.coordinates[1]}</span></div>
//                 )}
//                   </Col>
//                 </Row>
//                 </div>
//           </div>

//           <div className='location'>Location
//           <div>
//           <LeafletLocation coordinates={data?.coordinates} />
//           </div>
//           </div>

//           {showLoginModal && (
//             <Modal isOpen={showLoginModal} onClose={handleLoginModalClose}>
//             <h2>Login Required</h2>
//             <p>You need to login first.</p>
//             <button className='button' onClick={handleLoginModalConfirm}>Go to Login</button>
//             <button onClick={handleLoginModalClose}>Close</button>
//             </Modal>
//           )}
//           </Col>
//           </Row>
//       </Col>
//       <Col md ="4">
//       <BriefCharacter data={data}/>

//       {
//         (userId && userId === owner) ?(
//           <div className='view-document'>
//             <button className='button' onClick={handleAddDocument}>Add document</button>
//             </div>
//         ):(
//           <div className='view-document'>
//             <button className='button' onClick={handleViewDocument}> View Document</button>
//             </div>
//         )  
//        }

//        {
//         ( userId && userId === owner && documentData) &&  
//         <div className='view-document'>
//             <button className='button' onClick={handleViewDocument}> View Document</button>
//             </div>
//        }
            
//             <div className='user-info-container'>
//               <p className='user-info'>Seller Information</p>
//                   <p>Email: {data?.user?.email}</p>
//                   <p>Contact: {data?.user?.contact}</p>
//                   <p>Name: {data?.user?.name}</p>
//             </div>
//             <div className='user-info-container'>
//               <p className='user-info'>Chat with {data?.user?.name} Now </p>
//                 {userId && 
//                 <p>
//                   Click here to start a conversation:
//                   <Link to='/chats' >
//                   <MessageOutlined />
//                   </Link>
//                 </p>
//                 }
//             </div>
            
//       </Col>
//       </Row>
//     </Container>
//     {showViewDocumentModal  && (
//               <div className={`modal-overlay ${showViewDocumentModal ? "active" : ""}`} onClick={handleViewDocumentModalClose}>
//             <div className="modal-content">
//             <h2>Property Document</h2>
//             <div className='document-wrapper'>
//               <p style={{paddingRight: '10px', color: 'black'}}>Naksa</p>
//               <img src={naksaImage} alt="Naksa" className='document-image' />
//             </div>
//             <div className='document-wrapper'>
//               <p style={{paddingRight: '10px', color: 'black'}}>Lalpurja</p>
//               <img src={lalpurjaImage} alt="Lalpurja" className='document-image' />
//             </div>
//             <button className='button' onClick={handleViewDocumentModalClose}>Close</button>
//             </div>
//             </div>
//           )}


// {showAddDocumentModal  && (
//               <div className={`modal-overlay ${showAddDocumentModal ? "active" : ""}`} >
//             <div className="modal-content">
//             <h2>Property Document</h2>
//             <form onSubmit={handleDocumentSubmit}>
//         <div>
//           <label htmlFor="naksa">Naksa and lalpurja</label>
//           <input 
//           onChange={handleImageUpload}
//            type="file"
//             id="naksa" 
//             accept="image/*"
//             multiple
//              />
//         </div>
//         {/* <div>
//           <label htmlFor="lalpurja">Lalpurja</label>
//           <input onChange={handleImageUpload} type="file" id="lalpurja" accept="image/*"  />
//         </div> */}
//         <button type="submit" className='button'>Submit</button>
//         <button type="button" className='button' onClick={handleAddDocumentClose}>Close</button>
//       </form></div>
//             </div>
//           )}


//           {/* Fix Meeting Confirmation Modal */}
//       {showFixMeetingConfirmationModal && (
//         <Modal isOpen={showFixMeetingConfirmationModal} onClose={handleCloseFixMeetingConfirmationModal}>
//           <h2>Do you want to send a message to the seller?</h2>
//           <button className='button' onClick={handleFixMeeting}>Yes</button>
//           <button onClick={handleCloseFixMeetingConfirmationModal}>Cancel</button>
//         </Modal>
//       )}
//   </div>
//   );
// };

// export default OfferPropertyDetailPage;
