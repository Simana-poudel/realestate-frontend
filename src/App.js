import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import HomePage from './components/Homepage';
import PropertyDetail from './components/PropertyDetail';
import PropertyAddPage from './components/PropertyAddPage';
import VerifyPage from './components/VerifyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/property.css';
import './css/footer.css'; // Import the CSS file for styling
import './css/homepage.css'; // Import the CSS file for styling
import './css/login.css';
import './css/propertyadd.css';
import './css/register.css';
import OfferPropertyAddPage from './components/OfferPropertyAddPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-signup" element={<VerifyPage />} />
        <Route path="/addproperty" element={<PropertyAddPage />} />
        <Route path="/offerproperty" element={<OfferPropertyAddPage />} />
        <Route path="/property/:propertyId" element={<PropertyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
