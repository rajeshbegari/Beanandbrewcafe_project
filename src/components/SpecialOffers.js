import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { offers } from '../data/offers';
import PayPalButton from './PaypalButton';

const SpecialOffers = () => {
  const { addToCart, addToWishlist, notification, clearNotification } = useContext(ShopContext);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  return (
    <div className="container">
      <h2>Special Offers</h2>
      <div className="offers-list">
        {offers.map(offer => (
          <div key={offer.id} className="offer-item">
            <img src={offer.image} alt={offer.name} />
            <h3>{offer.name}</h3>
            <p>{offer.price}</p>
            <button onClick={() => addToCart({ ...offer, price: offer.price })}>
              Add to Cart
            </button>
            <button onClick={() => addToWishlist(offer)}>Add to Wishlist</button>
            <PayPalButton amount={offer.price.replace('$', '')} />
          </div>
        ))}
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default SpecialOffers;