import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles.css';

const Wishlist = () => {
  const { user, wishlist, removeFromWishlist, moveToCart, moveAllToCart, deleteAllWishlistItems } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = async (item) => {
    await moveToCart(item, addToCart);
  };

  const handleMoveAllToCart = async () => {
    await moveAllToCart(addToCart);
  };

  const handleDeleteAll = async () => {
    await deleteAllWishlistItems();
  };

  return (
    <main className="wishlist-container">
      <div className="container">
        <h2>My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <>
            <button className="btn btn-primary mb-3" onClick={handleMoveAllToCart}>Move All To Cart</button>
            <button className="btn btn-danger mb-3 ml-3" onClick={handleDeleteAll}>Delete All Items</button>
            <div className="row">
              {wishlist.map((item) => (
                <div key={item.id} className="col-md-6 mb-4">
                  <div className="card">
                    <img src={item.image} className="card-img-top" alt={item.caption} />
                    <div className="card-body">
                      <h5 className="card-title">{item.caption}</h5>
                      <p className="card-text"><strong>{item.price}</strong></p>
                      <button className="btn btn-info mr-2" onClick={() => handleMoveToCart(item)}>Move to Cart</button>
                      <button className="btn btn-danger" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Wishlist;