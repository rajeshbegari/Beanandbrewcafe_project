import React from 'react';
import { feedback } from '../data/feedback';

const CustomerFeedback = () => {
  return (
    <div className="container">
      <h2>Customers Feedback</h2>
      <div className="customer-feedback">
        {feedback.map(item => (
          <div key={item.id} className="feedback-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.caption}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFeedback;

