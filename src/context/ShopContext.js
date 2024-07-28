
import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const addToWishlist = (item) => {
    setWishlist([...wishlist, item]);
  };

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, addToWishlist }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;