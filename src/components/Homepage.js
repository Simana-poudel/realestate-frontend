import React, { useEffect, useState } from 'react';
import { getProperties } from '../api';
import NavBar from './Navbar';
import Footer from './footer';
import PropertyCard from './PropertyCard';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');


  useEffect(() => {
    async function getPropertyData() {
      const property = await getProperties();
      console.log({ property });
      setData(property.data);
    }
    getPropertyData()
  }, []);


  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.textContent);
  };
 
  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.textContent);
  };

  const handleSearch = () => {
    // Perform search based on selected district and city
    console.log('Perform search:', selectedDistrict, selectedPropertyType);

    navigate(`/searchproperty/${selectedDistrict}/${selectedPropertyType}`);

    // Call the API with the selected filters
    getProperties({
      district: selectedDistrict,
      propertyType: selectedPropertyType
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.error('Error fetching properties:', error);
    });
  };

  const handleLandClick = () => {
    console.log(' landclicked:');

    navigate(`/searchproperty/land`);
  };

  const handleHouseClick = () => {
    console.log(' houseclicked:');

    navigate(`/searchproperty/:propertyType`);
  };



  return (
    <div className='homepage-background'>
      <NavBar />
      <div className='background-container container'>
        <div className='content-overlay'>
          <h1 className="homepage-heading">SellBy</h1>
          <p className="homepage-description">Find your dream home or sell your property with ease.</p>
          <div class="search-container">
            <form action="/searchproperty">
            <Row>
              <Col md='5'>
              <div class="search-field">
                <div>
                  <div className='Wheretext'>Where</div>
                <input className='searchfield'
                 value={selectedDistrict} 
                 type="text" 
                 id="location" 
                 name="location" 
                 placeholder="Enter location..."
                 readOnly />
                <ul class="location-list">
                    <li onClick={handleDistrictChange} value="Kathmandu">Kathmandu</li>
                    <li onClick={handleDistrictChange} value="kaski">kaski</li>
                    <li onClick={handleDistrictChange} value="Chitwan">Chitwan</li>
                    <li onClick={handleDistrictChange} value="Lalitpur">Lalitpur</li>
                    <li onClick={handleDistrictChange} value="Bhaktapur">Bhaktapur</li>
                  </ul>
                </div>
              </div>
              </Col>
              <Col md='5'>
              <div class="search-field">
                <div>
                  <div className='Wheretext' >Property Type</div>
                <input className='searchfield'
                value={selectedPropertyType}
                 type="text" 
                 id="PropertyType" 
                 name="propertyType" 
                 placeholder="Enter property type ..."
                  />
                <ul class="location-list">
                  <li onClick={handlePropertyTypeChange} value="house">house</li>
                  <li onClick={handlePropertyTypeChange} value="land">land</li>
                </ul>
                </div>
              </div>
              </Col>
              <Col md='2'>
              <div className='search-button' onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} className='search-icon' />

              <button type="submit" className='text search-text'>Search</button>
              </div>
              </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
      <div className='container property-type-container'>
        <p className='homepage-content-title'>Select Property Type</p>
        <p className='homepage-content-description'> choose what are you looking for</p>
        <div className='image-container'>
          <Row>
            <Col md='6'>
              <div onClick={handleLandClick} value="house" className='property-land-image-wrapper'>
              </div>
            </Col>
            <Col md='6'>
            <div onClick={handleHouseClick} value="land"className='property-house-image-wrapper'>
              </div>
            </Col>
          </Row>
          
        </div>
      </div>

      <div className='container property-type-container'>
        <p className='homepage-content-title'>Latest House and Land</p>
        <p className='homepage-content-description'>house and land on sale</p>
        <div className='image-container'>
            <div className="property-card-container">
          {data.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
            />
          ))}
        </div>
          <div className='view-more-container'>
          <button className='view-more button'>View more</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
