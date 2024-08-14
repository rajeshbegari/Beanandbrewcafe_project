import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [lastVisitedPage, setLastVisitedPage] = useState('/');

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateCartItemQuantity,
      clearCart,
      lastVisitedPage, 
      setLastVisitedPage 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };