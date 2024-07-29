import React from 'react';
import { FaFacebook, FaInstagram } from'react-icons/fa';
import { SiX } from'react-icons/si';

const Footer = () => {
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Bean and Brew Cafe is committed to providing the best coffee experience.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: <a href="mailto:contact@beanandbrewcafe.com">contact@beanandbrewcafe.com</a></p>
            <p>Phone: +1 (438) 468-1990</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <a href="https://www.facebook.com/beanandbrewcafe" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.x.com/beanandbrewcafe" target="_blank" rel="noopener noreferrer">
            <SiX className="social-icon" />
            </a>
            <a href="https://www.instagram.com/beanandbrewcafe" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; {new Date().getFullYear()} Bean and Brew Cafe. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;