import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../api';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';


const RegisterPage = () => {

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic

     // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;

    // Create an object with the form data
    const data = {
    name,
    email,
    contact,
    password
    };

    try {
      // Call the createAccount function and pass the data
      const response = await createAccount(data);
      // Save the email in local storage
      localStorage.setItem('email', email);
      console.log({reponse: response});
      // window.location.href = '/api/user/auth/verify-signup';
      // Redirect to the next page only if the POST request is successful
    if (response.email) {
      navigate('/verify-signup');
    }

    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <div className="signup-form-wrapper">
              <h1 className="signup-heading">Create Account</h1>
              <Form onSubmit={handleSignup}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" id="name" placeholder="Enter your name" required />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" id="email" placeholder="Enter your email" required />
                </FormGroup>
                <FormGroup>
                  <Label for="contact">Contact Number</Label>
                  <Input type="tel" id="contact" placeholder="Enter your contact number" required />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" required />
                </FormGroup>
                <Button color="primary" block> Register</Button>             
                </Form>
              <div className="signup-links">
                <span className="login-link">Already have an account? <Link to="/login">Login</Link></span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
