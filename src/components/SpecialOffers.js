import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { offers } from '../data/offers';
import PayPalButton from './PaypalButton';

const SpecialOffers = () => {
  const { addToCart, addToWishlist } = useContext(ShopContext);

  return (
    <div className="container">
      <h2>Special Offers</h2>
      <div className="offers-list">
        {offers.map(offer => (
          <div key={offer.id} className="offer-item">
            <img src={offer.image} alt={offer.name} />
            <h3>{offer.name}</h3>
            <p>{offer.price}</p>
            <button onClick={() => addToCart(offer)}>Add to Cart</button>
            <button onClick={() => addToWishlist(offer)}>Add to Wishlist</button>
            <PayPalButton amount={offer.price.replace('$', '')} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;