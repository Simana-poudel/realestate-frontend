import React, { useEffect, useState } from 'react';
import { getProperties } from '../api';
import NavBar from './Navbar';
import Footer from './footer';
import PropertyCard from './PropertyCard';


const HomePage = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPropertyData() {
      const property = await getProperties();
      console.log({ property });
      setData(property.data);
      console.log(data);
    }
    getPropertyData()
  }, []);

  return (
    <div className='homepage-background'>
      <NavBar />
      <div className="homepage-content">
        <h1 className="homepage-heading">SellBy</h1>
        <p className="homepage-description">Find your dream home or sell your property with ease.</p>
        <div className="search-property">
          <select className="search-input">
            <option value="">District</option>
            <option value="district1">District 1</option>
            <option value="district2">District 2</option>
            <option value="district3">District 3</option>
          </select>
          <select className="search-input">
            <option value="">City</option>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
            <option value="city3">City 3</option>
          </select>
          <select className="search-input">
            <option value="">Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
          <button className="search-button">Search</button>
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
