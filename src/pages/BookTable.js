import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles.css';

const BookTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    tableSize: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Add booking to Firestore
      await addDoc(collection(db, 'tableBookings'), formData);

      // Send confirmation email
      await emailjs.send('service_ybddwyq', 'template_xj37trd', formData, '5sALWkTGXY6_9jrdY');

      setSuccessMessage('Your booking has been submitted successfully. A confirmation email has been sent to you.');
      setFormData({ name: '', email: '', date: '', time: '', tableSize: '' });
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrorMessage('There was an error submitting your booking. Please try again.');
    }
  };

  return (
    <main className="container mt-5">
      <h2>Book a Table</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tableSize">Table Size</label>
              <select
                className="form-control"
                name="tableSize"
                id="tableSize"
                value={formData.tableSize}
                onChange={handleChange}
                required
              >
                <option value="">Select Table Size</option>
                <option value="2">Table for 2</option>
                <option value="4">Table for 4</option>
                <option value="6">Table for 6</option>
                <option value="8">Table for 8</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Book Table</button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6 mb-3">
            <div className="image-wrapper">
                <img src={process.env.PUBLIC_URL + '/images/scrollingBanner5.jpeg'} alt="scrollingBanner5" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="image-wrapper">
                <img src={process.env.PUBLIC_URL + '/images/scrollingBanner7.jpeg'} alt="scrollingBanner7" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="image-wrapper">
                <img src={process.env.PUBLIC_URL + '/images/scrollingBanner6.jpeg'} alt="scrollingBanner6" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="image-wrapper">
                <img src={process.env.PUBLIC_URL + '/images/scrollingBanner4.jpeg'} alt="scrollingBanner4" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookTable;