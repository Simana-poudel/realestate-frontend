import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import {addOfferProperty} from '../api';
import { useNavigate } from 'react-router-dom';
import Leaflet from './Leaflet';
import Cookies from 'js-cookie';

// import { useNavigate } from 'react-router-dom';

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

const OfferPropertyAddPage = () => {

  const navigate = useNavigate();
  const [propertyImage, setPropertyImage] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

   // Use the selected district to get the cities for the dropdown
   const cities = popularCities[selectedDistrict] || [];

   // New state to store coordinates
   const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
 
  const [property, setProperty] = useState({
    propertyType: '',
    title: '',
    description: '',
    message: '',
    price: '',
    district: '',
    city: '',
    size: '',
    area: '',
    rooms: 0,
    parkingSpace: 0,
    kitchen: 0,
    bedroom: 0,
    diningRoom: 0,
    hall: 0,
    bathroom: 0,
    noOfFloors: 0,
    builtYear: '',
    usedArea: '',
    propertyImage: [],
  });

  // const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    // Set the retrieved userId directly in the property object
    setProperty((prevState) => ({
      ...prevState,
      userId: userId,
    }));
  }, []);

  useEffect(() => {
    const propertyId = localStorage.getItem('propertyId');
    // Set the retrieved userId directly in the property object
    setProperty((prevState) => ({
      ...prevState,
      propertyId: propertyId,
    }));
  }, []);

  const handleCoordinatesChange = (coords) => {
    setCoordinates(coords);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setPropertyImage((prevImage) => [...prevImage, ...files.slice(0, 10)]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      propertyImage.forEach((image, index) => {
      formData.append('testImage', image);
    });      
      // Append other property data fields to the formData object
      Object.keys(property).forEach((key) => {
        formData.append(key, property[key]);
      });

      // Append coordinates to the formData object
      formData.append('latitude', coordinates.latitude);
      formData.append('longitude', coordinates.longitude);


      const response = await addOfferProperty(formData);
      console.log(response.data); // Handle the response as needed
      const savedPropertyId = response.data._id; // Assuming the ID is available in response.data._id

      navigate(`/offerproperty/${savedPropertyId}`);

    } catch (error) {
      console.log(error);
    }
  };
  

  const handlePropertyTypeChange = (e) => {
    const { value } = e.target;
    setSelectedPropertyType(value);
    setProperty((prevState) => ({
      ...prevState,
      propertyType: value,
    }));
  };

  const handleDistrictChange = (e) => {
    const { value } = e.target;
    setSelectedDistrict(value);
    setProperty((prevState) => ({
      ...prevState,
      district: value,
    }));
    console.log(value);
    setSelectedCity(''); // Reset the selected city when the district changes
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    setSelectedCity(value);
    setProperty((prevState) => ({
      ...prevState,
      city: value,
    }));
  };
  
    // TODO: Add property to the database

  return (
    <div>
    <div className='container add-property-container'>
      <h2>Add your offer property here</h2>
      <Form onSubmit={ handleSubmit } className='property-add-container'>
        {/* Remove the user input field since the userId is retrieved from the local storage */}
        <FormGroup>
          <Label for="propertyType">Property Type</Label>
          <Input
            type="select"
            name="propertyType"
            id="propertyType"
            value={property.propertyType}
            onClick={handlePropertyTypeChange}
            onChange={handleChange}
            required
          >
            <option value="">Select Property Type</option>
            <option value="land">Land</option>
            <option value="house">House</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={property.description}
            onChange={handleChange}
            required
          />
          </FormGroup>
          <FormGroup>
          <Label for="message">Message to seller</Label>
          <Input
            type="text"
            name="message"
            id="message"
            placeholder='Write your message to the seller here'
            value={property.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
        <Label for="price">Price:</Label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder='Write full price of your property here in (Rs)'
            value={property.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="district">district</Label>
          <Input
            type="select"
            name="district"
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            required
            >
            <option value=''>Select District</option>
            {Object.keys(popularCities).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Input>
        </FormGroup>

        {selectedDistrict && (
            <FormGroup>
              <Label for='city'>City</Label>
              <Input
                type='select'
                name='city'
                id='city'
                value={selectedCity}
                onChange={handleCityChange}
                required
              >
                <option value=''>Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Input>
            </FormGroup>
          )}

        <FormGroup>
        <Label for="size">Size (in Anna)</Label>
            <Input
              type="number"
              name="size"
              id="size"
              value={property.size}
              onChange={handleChange}
              required
            />
          </FormGroup>          

          <FormGroup>
            <Label for="area">Area</Label>
            <Input
              type="number"
              name="area"
              id="area"
              value={property.area}
              onChange={handleChange}
              required
            />
          </FormGroup>          

          {selectedPropertyType === 'house' && (
        
        <div className='property-add-details-container'> 
          <h4 className='property-details-h4'>Property details</h4>
          <Row>
            <Col md="6">

        <FormGroup>
          <Label for="rooms">Rooms</Label>
          <Input
            type="number"
            name="rooms"
            id="rooms"
            value={property.rooms}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="parkingSpace">Parking Space</Label>
          <Input
            type="number"
            name="parkingSpace"
            id="parkingSpace"
            value={property.parkingSpace}
            onChange={handleChange}
            disabled={property.propertyType !== 'house'} // Disable if propertyType is not 'house'
          />
        </FormGroup>

        <FormGroup>
          <Label for="kitchen">Kitchen</Label>
          <Input
            type="number"
            name="kitchen"
            id="kitchen"
            value={property.kitchen}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="bedroom">Bedroom</Label>
          <Input
            type="number"
            name="bedroom"
            id="bedroom"
            value={property.bedroom}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="diningRoom">Dining Room</Label>
          <Input
            type="number"
            name="diningRoom"
            id="diningRoom"
            value={property.diningRoom}
            onChange={handleChange}
            required
          />
        </FormGroup>
            </Col>
            <Col md="6">



        <FormGroup>
          <Label for="hall">Hall</Label>
          <Input
            type="number"
            name="hall"
            id="hall"
            value={property.hall}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="bathroom">Bathroom</Label>
          <Input
            type="number"
            name="bathroom"
            id="bathroom"
            value={property.bathroom}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="noOfFloors">Number of Floors</Label>
          <Input
            type="number"
            name="noOfFloors"
            id="noOfFloors"
            value={property.noOfFloors}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="builtYear">Built Year(in B.S)</Label>
          <Input
            type="number"
            name="builtYear"
            id="builtYear"
            value={property.builtYear}
            onChange={handleChange}
            required
          />
        </FormGroup>
            </Col>
          </Row>


          </div>
        )}

<FormGroup>
<Label for="usedArea">Moda (in haat)</Label>
  <Input
    type="number"
    name="usedArea"
    id="usedArea"
    value={property.usedArea}
    onChange={handleChange}
    required
  />
</FormGroup>

        {/* Add other input fields here based on the property schema */}
        <FormGroup>
          <Label for="propertyImage">Property Image</Label>
          <Input
            type="file"
            name="propertyImage"
            id="propertyImage"
            multiple
            onChange={handleImageUpload}
            required
          />
        </FormGroup>
        <div>
          <h3>Selected Images:</h3>
          {propertyImage.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
          ))}
          </div>

          <FormGroup>
            <Label for="coordinates">Location</Label>
            {/* Pass the handleCoordinatesChange function as the onCoordinatesChange prop */}
            <Leaflet onCoordinatesChange={handleCoordinatesChange} />
          </FormGroup>

        <Button color="primary" type="submit">Offer Property</Button>
      </Form>
    </div>
    </div>
  );
};

export default OfferPropertyAddPage;
