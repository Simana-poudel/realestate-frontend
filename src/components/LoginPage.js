import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createlogin } from '../api';
import Cookies from 'js-cookie';

const LoginPage = () => {

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data ={
      email,
      password
    };
    try {
      const response = await createlogin(data);
      console.log({reponse: response});
      
      if (response.userId) {
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('username', response.username);
      Cookies.set('access_token', response.token);
      
      
      // Retrieve the saved path from localStorage
      const redirectPath = localStorage.getItem('redirectPath');

      if (redirectPath) {
        // Navigate the user back to the saved path
        navigate(redirectPath);

        // Remove the saved path from localStorage
        localStorage.removeItem('redirectPath');
      } else {
        navigate('/');
      }
      
      } else {
        // Handle verification failure
        console.error('login failed');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <div className="login-form-wrapper">
              <h1 className="login-heading">Login</h1>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" id="email" placeholder="Enter your email" required />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" required />
                </FormGroup>
                <Button color="primary" block> Login</Button>
                </Form>
                <div className="login-links">
                <span className="signup-link">Don't have an account? <Link to="/register">Register</Link></span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
