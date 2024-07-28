import React from 'react';
import SearchBar from '../components/SearchBar';
import SpecialOffers from '../components/SpecialOffers';
import PopularProducts from '../components/PopularProducts';
import CustomerFeedback from '../components/CustomerFeedback';
import ScrollingBanner from '../components/ScrollingBanner';


const Home = () => {
  return (
    <div> 
      <SearchBar />
      <SpecialOffers />
      <ScrollingBanner />
      <PopularProducts />
      <CustomerFeedback />
      
    </div>
  );
};

export default Home;