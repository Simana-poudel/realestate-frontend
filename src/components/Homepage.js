import React, { useEffect, useState } from 'react';
import { getProperties } from '../api';
import NavBar from './Navbar';
import Footer from './footer';
import PropertyCard from './PropertyCard';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {

  const [data, setData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');


  const popularCities = {
    Kathmandu: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Kirtipur', 'Madhyapur Thimi'],
    kaski: ['Pokhara', 'Lekhnath', 'Bharatpur', 'Tansen', 'Damauli'],
    Chitwan: ['Bharatpur', 'Ratnanagar', 'Khairahani', 'Meghauli', 'Ichhyakamana'],
    Lalitpur: ['Lalitpur', 'Godavari', 'Mahalaxmi', 'Konjyosom', 'Bagmati'],
    Bhaktapur: ['Bhaktapur', 'Madhyapur Thimi', 'Nagarkot', 'Changunarayan', 'Suryabinayak'],
    Palpa: ['Tansen', 'Rampur', 'Rambha', 'Ribdikot', 'Bagnaskali'],
    Rupandehi: ['Butwal', 'Siddharthanagar', 'Lumbini', 'Devdaha', 'Tilottama'],
    Kavrepalanchok: ['Banepa', 'Dhulikhel', 'Panauti', 'Panchkhal', 'Bhimeshwor']
  };
  

  useEffect(() => {
    async function getPropertyData() {
      const property = await getProperties();
      console.log({ property });
      setData(property.data);
    }
    getPropertyData()
  }, []);

  
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);

    // Reset selected city when district changes
    setSelectedCity('');
    setSelectedPropertyType('');


  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
 
  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.value);
  };

  const handleSearch = () => {
    // Perform search based on selected district and city
    // You can implement your search logic here
    console.log('Perform search:', selectedDistrict, selectedCity, selectedPropertyType);

    // Call the API with the selected filters
    getProperties({
      district: selectedDistrict,
      city: selectedCity,
      propertyType: selectedPropertyType
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.error('Error fetching properties:', error);
    });
  };

  // State to hold the options for the city dropdown
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    // Populate cities for the selected district
    const cities = popularCities[selectedDistrict] || [];
    setCityOptions(cities);
  }, [selectedDistrict]);

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
                <input className='searchfield' type="text" id="location" name="location" placeholder="Enter location..." />
                <ul class="location-list">
                  <li value="Kathmandu">Kathmandu</li>
                  <li value="kaski">Kaski</li>
                  <li value="Chitwan">Chitwan</li>
                  <li value="Lalitpur">Lalitpur</li>
                  <li value="Bhaktapur">Bhaktapur</li>
                </ul>
                </div>
              </div>
              </Col>
              <Col md='5'>
              <div class="search-field">
                <div>
                  <div className='Wheretext'>Property Type</div>
                <input className='searchfield' type="text" id="location" name="location" placeholder="Enter property type ..." />
                <ul class="location-list">
                  <li>House</li>
                  <li>Land</li>
                </ul>
                </div>
              </div>
              </Col>
              <Col md='2'>
              <div className='search-button'>
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
              <div className='property-land-image-wrapper'>
              </div>
            </Col>
            <Col md='6'>
            <div className='property-house-image-wrapper'>
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
