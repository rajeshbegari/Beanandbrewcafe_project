import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { products } from '../data/products';
import PayPalButton from './PaypalButton';

const PopularProducts = () => {
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
      <h2>Popular Products</h2>
      <div className="products-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => addToCart({ ...product, price: product.price })}>
              Add to Cart
            </button>
            <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
            <PayPalButton amount={product.price.replace('$', '')} />
          </div>
        ))}
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default PopularProducts;



