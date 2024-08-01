import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles.css';

const ContactUs = () => {
  const form = useRef();
  const [fileError, setFileError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    window.initMap = () => {
      const shopLocation = { lat: 45.55567, lng: -73.66826 }; 
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: shopLocation,
      });
      new window.google.maps.Marker({
        position: shopLocation,
        map: map,
      });
    };

    if (window.google && window.google.maps) {
      window.initMap();
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024) {
      setFileError('File size should not exceed 50KB');
      setAttachment(null);
    } else {
      setFileError('');
      setAttachment(file);
    }
  };

  const handleFileDelete = () => {
    setAttachment(null);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    
    if (attachment) {
      formData.append('attachment', attachment);
    }

    setFileError('');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await emailjs.sendForm('service_ybddwyq', 'template_gmviodu', form.current, '5sALWkTGXY6_9jrdY');
      console.log(result); // Log the result to the console
      setSuccessMessage('Your message has been submitted successfully');
      form.current.reset(); // Reset the form after successful submission
      setAttachment(null); // Reset attachment state
    } catch (error) {
      console.error('EmailJS error:', error);
      setErrorMessage('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <div className="contact-info mb-4">
        <p>Email: <a href="mailto:contact@beanandbrewcafe.com">contact@beanandbrewcafe.com</a></p>
        <p>Phone: +1 (438) 468-1990</p>
        <p>Location: 577, Boul. Henri-Bourassa Est, Montréal, Québec, H2C 1E2</p>
        <div id="map" style={{ height: '400px', width: '100%' }}></div>
      </div>
      <div className="feedback-form">
        <h3>Feedback / Complaint</h3>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="user_name">Your Name</label>
            <input
              type="text"
              className="form-control"
              name="user_name"
              id="user_name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_email">Your Email</label>
            <input
              type="email"
              className="form-control"
              name="user_email"
              id="user_email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select className="form-control" name="subject" id="subject" required>
              <option value="">Select a subject</option>
              <option value="Customer's Recommendations">Customer's Recommendations</option>
              <option value="Complaints">Complaints</option>
              <option value="Careers">Careers</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              className="form-control"
              name="message"
              id="message"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="attachment">Attachment <em>(max. file size is 50KB)</em></label>
            <input
              type="file"
              className="form-control-file"
              name="attachment"
              id="attachment"
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            {fileError && <small className="form-text text-danger">{fileError}</small>}
            {attachment && (
              <div className="attachment-preview">
                <p>{attachment.name}</p>
                <button type="button" className="btn btn-danger btn-sm" onClick={handleFileDelete}>Delete</button>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;