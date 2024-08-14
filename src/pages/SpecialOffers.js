import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const specialOffersData = [
  { id: 1, caption: 'Espresso', captionTag: 'from Special Offers', beforePrice: '$5.00', currentPrice: '$3.00', image: `${process.env.PUBLIC_URL}/images/espresso.jpeg` },
  { id: 2, caption: 'Latte', captionTag: 'from Special Offers', beforePrice: '$6.00', currentPrice: '$4.50', image: `${process.env.PUBLIC_URL}/images/latte.jpeg` },
  { id: 3, caption: 'Cappuccino', beforePrice: '$5.50', currentPrice: '$3.50', image: `${process.env.PUBLIC_URL}/images/cappuccino.jpeg` },
  { id: 4, caption: 'Americano', beforePrice: '$4.50', currentPrice: '$3.00', image: `${process.env.PUBLIC_URL}/images/americano.jpeg` },
  { id: 5, caption: 'Mocha', beforePrice: '$6.50', currentPrice: '$5.00', image: `${process.env.PUBLIC_URL}/images/mocha.jpeg` },
  { id: 6, caption: 'Macchiato', beforePrice: '$5.75', currentPrice: '$4.25', image: `${process.env.PUBLIC_URL}/images/macchiato.jpeg` },
  { id: 7, caption: 'Flat White', beforePrice: '$5.25', currentPrice: '$4.00', image: `${process.env.PUBLIC_URL}/images/flatwhite.jpeg` },
  { id: 8, caption: 'Iced Coffee', beforePrice: '$4.75', currentPrice: '$3.50', image: `${process.env.PUBLIC_URL}/images/icedcoffee.jpeg` },
  { id: 9, caption: 'Cold Brew', beforePrice: '$5.00', currentPrice: '$3.75', image: `${process.env.PUBLIC_URL}/images/cortado.jpeg` },
  // Additional offers...
];

const SpecialOffers = () => {
  const { addToCart, setLastVisitedPage } = useContext(CartContext);
  const { user, addToWishlist } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLastVisitedPage('/special-offers');
  }, [setLastVisitedPage]);

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      price: item.currentPrice,
      quantity: 1,
      captionTag: null,
    });
    setMessage('Added to Cart');
    setTimeout(() => {
      setMessage('');
      navigate('/cart');
    }, 2000);
  };

  const handleOrder = (item) => {
    const itemForOrder = {
      ...item,
      captionTag: undefined,
      price: item.currentPrice,
    };
    navigate(`/order/${item.id}`, { state: { item: itemForOrder, referrer: '/special-offers' } });
  };

  const handleAddToWishlist = (item) => {
    if (user) {
      addToWishlist({
        ...item,
        price: item.currentPrice,
      });
      setMessage('Added to Wishlist');
    } else {
      setMessage('You need to be logged in to add items to the wishlist.');
    }
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <main className="special-offers-container">
      <div className="container">
        <h2>Special Offers</h2>
        <div className="row">
          {specialOffersData.map((offer) => (
            <div key={offer.id} className="col-md-4 mb-4">
              <div className="card offer-card">
                <img src={offer.image} className="card-img-top" alt={offer.caption} />
                <div className="card-body">
                  <h5 className="card-title">{offer.caption}</h5>
                  <p className="card-text">
                    Price: <span className="before-price">{offer.beforePrice}</span> <span className="current-price">{offer.currentPrice}</span>
                  </p>
                  <button className="btn btn-primary mr-2" onClick={() => handleOrder(offer)}>Order</button>
                  <button className="btn btn-secondary mr-2" onClick={() => handleAddToCart(offer)}>Add to Cart</button>
                  <button className="btn btn-info" onClick={() => handleAddToWishlist(offer)}>Add to Wishlist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </main>
  );
};

export default SpecialOffers;



