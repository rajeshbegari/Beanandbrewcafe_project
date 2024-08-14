import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const coffeeTypes = [
  {
    id: 1,
    caption: 'Espresso',
    description: 'Rich and bold espresso.',
    price: '3.00',
    image: `${process.env.PUBLIC_URL}/images/espresso.jpeg`,
    ingredients: [
      { id: 1, caption: 'Coffee Beans', price: '2.50', image: `${process.env.PUBLIC_URL}/images/coffeebeans.jpeg` },
      { id: 2, caption: 'Water', price: '0.50', image: `${process.env.PUBLIC_URL}/images/Water.jpeg` },
    ],
  },
  {
    id: 2,
    caption: 'Latte',
    description: 'Smooth and creamy latte.',
    price: '4.00',
    image: `${process.env.PUBLIC_URL}/images/latte.jpeg`,
    ingredients: [
      { id: 1, caption: 'Espresso Shot', price: '2.50', image: `${process.env.PUBLIC_URL}/images/Espressoshot.jpeg` },
      { id: 2, caption: 'Milk', price: '1.50', image: `${process.env.PUBLIC_URL}/images/Milk.jpeg` },
    ],
  },
];

const MakeYourCoffee = () => {
  const { addToCart } = useContext(CartContext);
  const { user, addToWishlist } = useContext(AuthContext);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCoffeeSelection = (coffee) => {
    setSelectedCoffee(coffee);
    setSelectedIngredients([]);
    setSummary(null);
  };

  const handleIngredientSelection = (ingredient) => {
    setSelectedIngredients((prevIngredients) => {
      if (prevIngredients.includes(ingredient)) {
        return prevIngredients.filter((ing) => ing !== ingredient);
      } else {
        return [...prevIngredients, ingredient];
      }
    });
  };

  const calculateSummary = () => {
    const ingredientsTotal = selectedIngredients.reduce((total, ingredient) => {
      return total + parseFloat(ingredient.price);
    }, 0);

    const subtotal = parseFloat(selectedCoffee.price) + ingredientsTotal;
    const federalTax = subtotal * 0.05;
    const quebecTax = subtotal * 0.09975;
    const total = subtotal + federalTax + quebecTax;

    setSummary({
      subtotal: subtotal.toFixed(2),
      federalTax: federalTax.toFixed(2),
      quebecTax: quebecTax.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const handleCheckout = () => {
    if (summary) {
      navigate('/checkout', { 
        state: { 
          orderItems: [{
            id: selectedCoffee.id,
            caption: `${selectedCoffee.caption} Special`,
            description: selectedCoffee.description,
            price: `$${summary.subtotal}`,
            image: selectedCoffee.image,
            quantity: 1,
            ingredients: selectedIngredients
          }]
        }
      });
    }
  };

  const handleAddToCart = () => {
    if (summary) {
      addToCart({
        id: selectedCoffee.id,
        caption: `${selectedCoffee.caption} Special`,
        price: `$${summary.subtotal}`,
        image: selectedCoffee.image,
        ingredients: selectedIngredients,
        quantity: 1
      });
      setMessage('Added to cart successfully!');
    }
  };

  const handleEdit = () => {
    setSelectedIngredients([]);
    setSummary(null);
  };

  const handleAddToWishlist = () => {
    if (summary && user) {
      addToWishlist({
        id: selectedCoffee.id,
        caption: `${selectedCoffee.caption} Special`,
        description: selectedCoffee.description,
        price: `$${summary.subtotal}`,
        image: selectedCoffee.image,
        quantity: 1,
        ingredients: selectedIngredients,
      });
      setMessage('Added to wishlist successfully!');
    } else {
      alert('You need to be logged in to add items to the wishlist.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Make Your Coffee</h2>
      <p>At Bean and Brew Cafe, we empower you to craft your perfect coffee by selecting your favourite ingredients. This personalized approach ensures every cup reflects your unique taste, making each visit special and memorable. Enjoy a coffee experience tailored just for you at Bean and Brew Cafe. Select each coffee type to view its Ingredients to customize your recipe to your taste.</p>
      {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      <div className="row">
        <div className="col-md-4">
          {coffeeTypes.map((coffee, index) => (
            <div key={coffee.id} className="card mb-4">
              <img src={coffee.image} className="card-img-top" alt={coffee.caption} />
              <div className="card-body">
                <h5 className="card-title">{coffee.caption}</h5>
                <p className="card-text">{coffee.description}</p>
                <p className="card-text">${coffee.price}</p>
                <button className="btn btn-primary" onClick={() => handleCoffeeSelection(coffee)}>Select</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          {selectedCoffee && (
            <div className="card">
              <div className="card-body">
                <h3>Ingredients for {selectedCoffee.caption}</h3>
                {selectedCoffee.ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={ingredient.id}
                      checked={selectedIngredients.includes(ingredient)}
                      onChange={() => handleIngredientSelection(ingredient)}
                    />
                    <label className="form-check-label" htmlFor={ingredient.id}>
                      <img src={ingredient.image} alt={ingredient.caption} width="50" />
                      {ingredient.caption} - ${parseFloat(ingredient.price).toFixed(2)}
                    </label>
                  </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={calculateSummary}>Calculate Summary</button>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4">
          {summary && (
            <div className="card summary-box">
              <div className="card-body">
                <h3>Summary</h3>
                <p>Subtotal: ${summary.subtotal}</p>
                <p>Federal Tax: ${summary.federalTax}</p>
                <p>Quebec Tax: ${summary.quebecTax}</p>
                <h3>Total: ${summary.total}</h3>
                <button className="btn btn-success mt-3" onClick={handleCheckout}>Checkout</button>
                <button className="btn btn-warning mt-3 ml-2" onClick={handleEdit}>Edit</button>
                <button className="btn btn-info mt-3 ml-2" onClick={handleAddToCart}>Add to Cart</button>
                <button className="btn btn-secondary mt-3 ml-2" onClick={handleAddToWishlist}>Add to Wishlist</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeYourCoffee;