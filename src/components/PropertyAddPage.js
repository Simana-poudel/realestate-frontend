import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {createProperty} from '../api';
import { Navigate } from 'react-router-dom';
import NavBar from './Navbar';
// import { useNavigate } from 'react-router-dom';

const PropertyAddPage = () => {

  const [propertyImage, setPropertyImage] = useState(null);
  
  const [property, setProperty] = useState({
    propertyType: '',
    title: '',
    description: '',
    price: 0,
    district: '',
    city: '',
    size: 0,
    area: 0,
    rooms: 0,
    parkingSpace: 0,
    kitchen: 0,
    bedroom: 0,
    diningRoom: 0,
    hall: 0,
    bathroom: 0,
    noOfFloors: 0,
    builtYear: 0,
    usedArea: 0,
    propertyImage: [],
  });

  // const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    // Set the retrieved userId directly in the property object
    setProperty((prevState) => ({
      ...prevState,
      userId: userId,
    }));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPropertyImage(file);
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
      formData.append("testImage", propertyImage);
      
      // Append other property data fields to the formData object
      Object.keys(property).forEach((key) => {
        formData.append(key, property[key]);
      });

      const response = await createProperty(formData);

      console.log(response.data); // Handle the response as needed
      Navigate('/loginhomepage');
    } catch (error) {
      console.log(error);
    }
  };
  

    // TODO: Add property to the database

  return (
    <div>
      <NavBar />
    <div className='container add-property-container'>
      <h2>Add Property</h2>
      <Form onSubmit={ handleSubmit } className='property-add-container'>
        {/* Remove the user input field since the userId is retrieved from the local storage */}
        <FormGroup>
          <Label for="propertyType">Property Type</Label>
          <Input
            type="select"
            name="propertyType"
            id="propertyType"
            value={property.propertyType}
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
          <Label for="price">price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="district">district</Label>
          <Input
            type="text"
            name="district"
            id="district"
            value={property.district}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">city</Label>
          <Input
            type="text"
            name="city"
            id="city"
            value={property.city}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
  <Label for="size">Size</Label>
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
  <Label for="builtYear">Built Year</Label>
  <Input
    type="number"
    name="builtYear"
    id="builtYear"
    value={property.builtYear}
    onChange={handleChange}
    required
  />
</FormGroup>

<FormGroup>
  <Label for="usedArea">Used Area</Label>
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
            onChange={handleImageUpload}
            required
          />
        </FormGroup>
        <Button color="primary" type="submit">Add Property</Button>
      </Form>
    </div>
    </div>
  );
};

export default PropertyAddPage;
