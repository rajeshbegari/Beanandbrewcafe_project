import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import SpecialOffers from './pages/SpecialOffers';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ContactUs from './pages/ContactUs';
import ViewMenu from './components/ViewMenu';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import BookTable from './pages/BookTable';
import Cart from './pages/Cart';
import Order from './pages/Order';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ErrorBoundary from './components/ErrorBoundary';
import MyAccount from './components/MyAccount';
import Events from './components/Events';
import MakeYourCoffee from './pages/MakeYourCoffee';
import GetToken from './components/GetToken';
import './styles.css';

const stripePromise = loadStripe('your-stripe-public-key');

const App = () => {
  return (
    <ErrorBoundary>
    <Router>
      <div id="root">
        <Header />
        <Banner />
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/view-menu" element={<ViewMenu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/special-offers" element={<SpecialOffers />} />
            <Route path="/book-table" element={<BookTable />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/events" element={<Events />} />
            <Route path="/make-your-coffee" element={<MakeYourCoffee />} />
            <Route path="/get-token" element={<GetToken />} />
          </Routes>
        </Elements>
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>
  );
};

export default App;