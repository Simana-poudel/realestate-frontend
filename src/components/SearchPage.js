import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProperties } from '../api';
import PropertyCard from './PropertyCard';
import { Box, CircularProgress } from '@mui/material';

const SearchPage = () => {
  const { district, propertyType } = useParams();

  const [data, setData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(district || '');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState(propertyType || '');
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

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

      if(selectedDistrict && selectedPropertyType) {

        try {
          // Call the API with the selected filters
          const response = await getProperties({
            district: selectedDistrict,
            propertyType: selectedPropertyType

          });

          // Filter the properties based on the selected district
          const filteredProperties = response.data.filter(
            (property) => 
            property.district === selectedDistrict && property.propertyType === 
            selectedPropertyType);

          // Update the state with the filtered properties
          setData(filteredProperties);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }

      }

      else if(selectedPropertyType) {
        try {
          // Call the API with the selected filters
          const response = await getProperties({
            propertyType: selectedPropertyType
          });

          // Filter the properties based on the selected district
          const filteredProperties = response.data.filter(
            (property) => 
            property.propertyType === selectedPropertyType
            );

          // Update the state with the filtered properties
          setData(filteredProperties);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      }
      
      else {
        // Check if any selected parameters are present
      if (selectedDistrict || selectedPropertyType || selectedCity) {
        try {
          // Call the API with the selected filters
          const response = await getProperties({
            district: selectedDistrict,
            city: selectedCity,
            propertyType: selectedPropertyType
          });

          // Filter the properties based on the selected district
          const filteredProperties = response.data.filter(
            (property) => 
            property.district === selectedDistrict &&
            property.city === selectedCity &&
            property.propertyType === selectedPropertyType
            );

          // Update the state with the filtered properties
          setData(filteredProperties);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      }

        else {
          try {
            // If no selected parameters, call the API without any filters to fetch all properties
            const response = await getProperties();
    
            // Update the state with all properties
            setData(response.data);
          } catch (error) {
            console.error('Error fetching properties:', error);
          }
        }      
      }
    }
    getPropertyData();
  }, [selectedDistrict, selectedCity, selectedPropertyType]);
  
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);

    // Reset selected city when district changes
    setSelectedCity('');


  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
 
  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.value);
  };

  const handleSearch = async () => {
    // Perform search based on selected district and city
    // You can implement your search logic here
    console.log('Perform search:', selectedDistrict, selectedCity, selectedPropertyType);

    if(!selectedCity) return;
    setLoading(true);


    try {
      // Call the API with the selected filters
      const response = await getProperties({
        district: selectedDistrict,
        city: selectedCity,
        propertyType: selectedPropertyType
      });

      // Filter the properties based on the selected district
      const filteredProperties = response.data.filter(
        (property) =>
        property.district === selectedDistrict &&
        property.city === selectedCity &&
        property.propertyType === selectedPropertyType
        );
  
      // Wait for 1 second before updating the state with the filtered properties
      setTimeout(() => {
        setData(filteredProperties);
        setLoading(false); // Hide loading icon after 1 second
      }, 500);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false); // Hide loading icon on error
    }
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
      <div className="homepage-content">
        <div className="search-property">
          <select className="search-district search-input" value={selectedDistrict} onChange={handleDistrictChange} onClick={handleSearch}>
            <option value="all">District</option>
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
            <option value="all">Property Type</option>
            <option value="house">House</option>
            <option value="land">land</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search</button>
        </div>
        {

        }
        {loading ? (
          // Show circular progress while loading
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
        <div className="property-card-container">
          {data.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
            />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
