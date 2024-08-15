import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState('');

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      setNotification(`Increased quantity of ${item.name} in your cart.`);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      setNotification(`Added ${item.name} to your cart.`);
    }
  };

  const addToWishlist = (item) => {
    if (!wishlist.some(wishlistItem => wishlistItem.id === item.id)) {
      setWishlist([...wishlist, item]);
      setNotification(`Added ${item.name} to your wishlist.`);
    } else {
      setNotification(`${item.name} is already in your wishlist.`);
    }
  };

  const clearNotification = () => {
    setNotification('');
  };

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, addToWishlist, notification, clearNotification }}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };