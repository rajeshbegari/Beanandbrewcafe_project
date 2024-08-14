import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../Styles/ViewMenu.css';

const menuData = [
    { id: 1, caption: 'Espresso', description: 'Strong, rich coffee brewed by forcing hot water through finely-ground beans.', price: '$10', image: `${process.env.PUBLIC_URL}/images/espresso.jpeg` },
    { id: 2, caption: 'Latte', description: 'Smooth espresso with steamed milk, topped with a light foam.', price: '$15', image: `${process.env.PUBLIC_URL}/images/latte.jpeg` },
    { id: 3, caption: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam, offering a creamy texture.', price: '$10', image: `${process.env.PUBLIC_URL}/images/cappuccino.jpeg` },
    { id: 4, caption: 'Americano', description: 'Espresso diluted with hot water, similar to drip coffee in strength.', price: '$15', image: `${process.env.PUBLIC_URL}/images/americano.jpeg` },
    { id: 5, caption: 'Mocha', description: 'Espresso mixed with steamed milk and chocolate syrup, topped with whipped cream.', price: '$10', image: `${process.env.PUBLIC_URL}/images/mocha.jpeg` },
    { id: 6, caption: 'Macchiato', description: 'Espresso with a dash of steamed milk and foam for a bold flavor.', price: '$15', image: `${process.env.PUBLIC_URL}/images/macchiato.jpeg` },
    { id: 7, caption: 'Flat White', description: 'Espresso with microfoam, offering a stronger coffee-to-milk ratio than a latte.', price: '$10', image: `${process.env.PUBLIC_URL}/images/flatwhite.jpeg` },
    { id: 8, caption: 'Affogato', description: 'Espresso poured over a scoop of vanilla ice cream.', price: '$15', image: `${process.env.PUBLIC_URL}/images/affogato.jpeg` },
    { id: 9, caption: 'Cortado', description: 'Equal parts espresso and steamed milk, providing a balanced flavor.', price: '$10', image: `${process.env.PUBLIC_URL}/images/cortado.jpeg` },
    { id: 10, caption: 'Iced Coffee', description: 'Brewed coffee cooled and served over ice, customizable with sweeteners and flavors.', price: '$15', image: `${process.env.PUBLIC_URL}/images/icedcoffee.jpeg` },
    { id: 11, caption: 'Double Double', description: 'Canadian classic. Two creams and two sugars.', price: '$10', image: `${process.env.PUBLIC_URL}/images/doubleexpresso.jpeg` },
    { id: 12, caption: 'Red Eye', description: 'A shot of espresso added for an extra caffeine kick.', price: '$15', image: `${process.env.PUBLIC_URL}/images/redeye.jpeg` },
    { id: 13, caption: 'Café au Lait', description: 'Equal parts steamed milk, using brewed coffee as the basis.', price: '$10', image: `${process.env.PUBLIC_URL}/images/CaféauLait.jpeg` },
    { id: 14, caption: 'Caramel Macchiato', description: 'Espresso with steamed milk, vanilla syrup, and a drizzle of caramel sauce, creating a sweet and creamy coffee.', price: '$15', image: `${process.env.PUBLIC_URL}/images/caramelmacchiato.jpeg` },
];

const ViewMenu = () => {
  const { addToCart, setLastVisitedPage } = useContext(CartContext);
  const { user, addToWishlist } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLastVisitedPage('/view-menu');
  }, [setLastVisitedPage]);

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      price: item.price,
      quantity: 1
    });
    setMessage('Added to Cart');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleAddToWishlist = (item) => {
    if (user) {
      addToWishlist(item);
      setMessage('Added to Wishlist');
    } else {
      setMessage('You need to be logged in to add items to the wishlist.');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const handlePayWithPaypal = (item) => {
    navigate('/checkout', { state: { orderItems: [{ ...item, quantity: 1 }] } });
  };

  return (
    <main className="menu-container">
      {menuData.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={item.image} alt={item.caption} />
          <h3>{item.caption}</h3>
          <p>{item.description}</p>
          <p><strong>{item.price}</strong></p>
          <button className="btn btn-secondary" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          <button className="btn btn-info" onClick={() => handleAddToWishlist(item)}>Add to Wishlist</button>
          <button className="btn btn-primary" onClick={() => handlePayWithPaypal(item)}>Pay with Paypal</button>
        </div>
      ))}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </main>
  );
};

export default ViewMenu;