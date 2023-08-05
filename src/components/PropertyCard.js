import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/propertycard.css';
import { Col, Row } from 'reactstrap';

const PropertyCard = ({property}) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
    };    console.log({id: property._id})
  
      return ( 
          <Col md='3' className=" property-wrapper" onClick={handleClick}>
            <Link to={`/property/${property._id}`} >
              <img src={property.propertyImage[0]?.name} alt="Property" className="card-image" />
              <div className="card-content">
                <p className="card-title">{property.title}</p>
                <p className="card-price">{property.price}</p>
                <p className="card-city">{property.city}</p>
              </div>
            </Link>
          </Col>
      );
    };

    export default PropertyCard;