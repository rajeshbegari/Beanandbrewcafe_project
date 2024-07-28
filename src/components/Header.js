import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; // Import CartContext
import { auth } from '../firebaseConfig';
import { FaUser, FaGlobe, FaShoppingCart } from 'react-icons/fa'; // Import FaShoppingCart
import '../styles.css';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // Use CartContext
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <header className="header">
      <div className="container header-left">
        <Link to="/">{t('Home')}</Link>
        <Link to="/virtual-coffee-tasting">{t('Virtual Coffee Tasting')}</Link>
        <Link to="/special-offers">{t('Special Offers')}</Link>
        <Link to="/events">{t('Events')}</Link>
        <Link to="/make-your-coffee">{t('Make Your Coffee')}</Link>
      </div>
      <div className="container header-right">
        <Link to="/about-us">{t('About')}</Link>
        <Link to="/contact-us">{t('Contact Us')}</Link>
        <Link to="/gallery">{t('Gallery')}</Link>
        <Link to="/orders">{t('Orders')}</Link>
        <Link to="/cart">
          <FaShoppingCart /> <span>{cartItems.length}</span>
        </Link>
        {user ? (
          <div className="user-menu">
            <span>{t('Welcome!')} {user.firstName} {user.lastName}</span>
            <button onClick={() => auth.signOut()}>{t('Logout')}</button>
            <div className="dropdown">
              <FaUser className="user-icon" />
              <div className="dropdown-content">
                <Link to="/my-account">{t('My Account')}</Link>
                <Link to="/orders">{t('Orders')}</Link>
                <Link to="/wishlist">{t('Wishlist')}</Link>
              </div>
            </div>
            <button className="btn-language" onClick={toggleLanguage}>
              <FaGlobe /> {language === 'en' ? 'FR' : 'EN'}
            </button>
          </div>
        ) : (
          <>
            <div className="dropdown">
              <button onClick={() => setShowLogin(!showLogin)}>{t('Login')}</button>
              {showLogin && <LoginForm />}
            </div>
            <div className="dropdown">
              <button onClick={() => setShowRegister(!showRegister)}>{t('Register')}</button>
              {showRegister && <RegisterForm />}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;