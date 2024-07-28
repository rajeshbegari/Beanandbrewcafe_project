import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; 
import { AuthProvider } from './context/AuthContext';
import ShopProvider from './context/ShopContext';
import { CartProvider } from './context/CartContext';

ReactDOM.render(
  <AuthProvider>
    <ShopProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </ShopProvider>
  </AuthProvider>,
  document.getElementById('root')
);