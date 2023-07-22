import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/propertycard.css';
import { Col, Row } from 'reactstrap';

const PropertyCard = ({property}) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/property/${property._id}`);
    };    console.log({id: property._id})
  
      return ( 
          <Col md='3' className=" property-wrapper" onClick={handleClick}>
              <img src={property.propertyImage[0]?.name} alt="Property" className="card-image" />
              <div className="card-content">
                <p className="card-title">{property.title}</p>
                <p className="card-price">{property.price}</p>
                <p className="card-city">{property.city}</p>
              </div>
          </Col>
      );
    };

    export default PropertyCard;