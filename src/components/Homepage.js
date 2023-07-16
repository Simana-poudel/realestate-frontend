import React, { useEffect, useState } from 'react';
import { getProperties } from '../api';
import NavBar from './Navbar';
import Footer from './footer';
import PropertyCard from './PropertyCard';


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


    // Populate cities for the selected district
    const cities = popularCities[selectedDistrict] || [];
    // setCityOptions(cities);
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
      <div className="homepage-content">
        <h1 className="homepage-heading">SellBy</h1>
        <p className="homepage-description">Find your dream home or sell your property with ease.</p>
        <div className="search-property">
          <select className="search-district search-input" value={selectedDistrict} onChange={handleDistrictChange} onClick={handleSearch}>
            <option value="">District</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="kaski">Kaski</option>
            <option value="Chitwan">Chitwan</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Palpa">Palpa</option>
            <option value="Rupandehi">Rupandehi</option>
            <option value="Kavrepalanchok">Kavrepalanchok</option>
          </select>
          <select className="search-input" value={selectedCity} onChange={handleCityChange} onClick={handleSearch}>
            <option value="">City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select className="search-input" value={selectedPropertyType} onChange={handlePropertyTypeChange} onClick={handleSearch} >
            <option value="">Property Type</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search</button>
        </div>
        <div className="property-card-container">
          {data.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
