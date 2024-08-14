import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import specialOffersData from '../data/specialOffersData';
import menuData from '../data/menuData';
import '../styles.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const searchQuery = location.state?.query || '';

  useEffect(() => {
    const allItems = [...specialOffersData, ...menuData];
    const filteredItems = allItems.filter(item => {
      const caption = item.captionText || item.caption;
      return caption && caption.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setResults(filteredItems);
  }, [searchQuery]);

  const handleAddToCart = (item) => {
    const price = item.currentPrice || item.price;
    addToCart({
      ...item,
      price,
      quantity: 1,
      caption: item.captionText || item.caption,
      captionTag: item.captionText ? 'from Special Offers' : '',
    });
    setMessage('Added to Cart');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleAddToWishlist = (item) => {
    if (user) {
      addToWishlist({
        id: item.id,
        caption: item.captionText || item.caption,
        captionTag: item.captionText ? 'from Special Offers' : '',
        description: item.description,
        price: item.currentPrice || item.price,
        image: item.image,
      });
      setMessage('Added to Wishlist');
    } else {
      setMessage('You need to be logged in to add items to the wishlist.');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const handleOrderNow = (item) => {
    const price = item.currentPrice || item.price;
    const itemForOrder = {
      id: item.id,
      caption: item.captionText || item.caption,
      captionTag: item.captionText ? 'from Special Offers' : '',
      description: item.description,
      price: price,
      image: item.image,
      quantity: 1,
    };
    navigate(`/order/${item.id}`, { state: { item: itemForOrder } });
  };

  const handleClear = () => {
    setResults([]);
    navigate('/');
  };

  return (
    <main className="search-results-container">
      <div className="container">
        <h2>Search Results for "{searchQuery}"</h2>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((item) => (
            <div key={item.id} className="search-result">
              <img src={item.image} alt={item.captionText || item.caption || 'Coffee Image'} />
              <h3>
                {item.captionText || item.caption}
                {item.captionText && (
                  <span style={{ fontStyle: 'italic', color: 'gray' }}> from Special Offers</span>
                )}
              </h3>
              <p>{item.description || 'No description available'}</p>
              <p><strong>{item.currentPrice || item.price}</strong></p>
              <button className="btn btn-secondary" onClick={() => handleAddToCart(item)}>Add to Cart</button>
              <button className="btn btn-info" onClick={() => handleAddToWishlist(item)}>Add to Wishlist</button>
              <button className="btn btn-primary" onClick={() => handleOrderNow(item)}>Order Now</button>
            </div>
          ))
        )}
        <button className="btn btn-primary" onClick={handleClear}>Clear</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </main>
  );
};

export default SearchResults;
