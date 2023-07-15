import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createVerifyUser } from '../api';

const VerifyPage = () => {
  const [emailError, setEmailError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();

    // Get email and OTP
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;

    // Get the email from local storage
    const savedEmail = localStorage.getItem('email');

    if (email !== savedEmail) {
      setEmailError('Email mismatch');
      return;
    }

    const data = {
      email,
      OTP:otp
    };

    try {
      // Call the createVerifyUser function and pass the data
      const response = await createVerifyUser(data);
      // Handle the response as needed
      console.log({reponse: response});

      if (response.message) {
        // Redirect to the login page if verification is successful
        window.location.href = '/login';
      } else {
        // Handle verification failure
        console.error('OTP verification failed');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="verify-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <div className="verify-form-wrapper">
              <h1 className="verify-heading">Login</h1>
              <Form onSubmit={handleVerify}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" id="email" placeholder="Enter your email" required />
                  {emailError && <span className="error-message">{emailError}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="otp">OTP</Label>
                  <Input type="text" id="otp" placeholder="Enter the OTP" required />
                </FormGroup>
                <Button color="primary" block>Verify</Button>
              </Form>
              <div className="verify-links">
                <span className="signup-link">Don't get OTP? <div className='resendButton'>Resend</div></span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyPage;
