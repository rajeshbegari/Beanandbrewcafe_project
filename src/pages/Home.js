import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SpecialOffers from '../components/SpecialOffers';
import PopularProducts from '../components/PopularProducts';
import CustomerFeedback from '../components/CustomerFeedback';
import ScrollingBanner from '../components/ScrollingBanner';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate('/search-results', { state: { query } });
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <SpecialOffers />
      <ScrollingBanner />
      <PopularProducts />
      <CustomerFeedback />
    </div>
  );
};

export default Home;
