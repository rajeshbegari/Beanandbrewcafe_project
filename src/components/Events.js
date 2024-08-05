import React, { useState, useContext, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles.css';

const futureEvents = [
  {
    id: 1,
    caption: 'Coffee Tasting Workshop',
    description: 'Join us for a unique coffee tasting experience where you can sample a variety of coffees from around the world.',
    date: '2024-08-15',
    image: `${process.env.PUBLIC_URL}/images/mocha.jpeg`,
  },
  {
    id: 2,
    caption: 'Latte Art Class',
    description: 'Learn the art of making beautiful latte designs in our interactive class.',
    date: '2024-09-10',
    image: `${process.env.PUBLIC_URL}/images/cortado.jpeg`,
  },
  {
    id: 3,
    caption: 'Barista Training',
    description: 'Get trained by professional baristas and learn how to make the perfect cup of coffee.',
    date: '2024-10-05',
    image: `${process.env.PUBLIC_URL}/images/latte.jpeg`,
  },
  {
    id: 4,
    caption: 'Coffee Brewing Techniques',
    description: 'Discover different brewing techniques to make the perfect coffee at home.',
    date: '2024-11-20',
    image: `${process.env.PUBLIC_URL}/images/affogato.jpeg`,
  },
  {
    id: 5,
    caption: 'Coffee and Dessert Pairing',
    description: 'Enjoy a delightful pairing of coffee and desserts in our special event.',
    date: '2024-12-15',
    image: `${process.env.PUBLIC_URL}/images/americano.jpeg`,
  },
  {
    id: 6,
    caption: 'Holiday Coffee Tasting',
    description: 'Celebrate the holidays with a special coffee tasting event featuring seasonal flavors.',
    date: '2024-12-25',
    image: `${process.env.PUBLIC_URL}/images/cappuccino.jpeg`,
  }
];

const pastEvents = [
  {
    id: 1,
    title: "Coffee Tasting Event",
    description: "An amazing coffee tasting event where participants enjoyed various coffee blends.",
    date: "March 12, 2023",
    imageUrl: `${process.env.PUBLIC_URL}/images/ife1.jpeg`,
  },
  {
    id: 2,
    title: "Latte Art Workshop",
    description: "Learn the art of making lattes with beautiful designs in this hands-on workshop.",
    date: "April 5, 2023",
    imageUrl: `${process.env.PUBLIC_URL}/images/ife2.jpeg`,
  }
];

const Events = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    email: user ? user.email : '',
    event: '',
    date: '',
    location: '',
    additionalInfo: '',
    attendees: 1,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setFormData((prevData) => ({
        ...prevData,
        event: selectedEvent.caption,
        date: selectedEvent.date,
      }));
    }
  }, [selectedEvent]);

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDownloadICS = () => {
    const icsData = `
      BEGIN:VCALENDAR
      VERSION:2.0
      BEGIN:VEVENT
      SUMMARY:${formData.event}
      DTSTART:${new Date(formData.date).toISOString().replace(/-|:|\.\d+/g, '')}T120000Z
      DTEND:${new Date(new Date(formData.date).getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, '')}T130000Z
      LOCATION:${formData.location === 'Virtual' ? 'Online (Zoom)' : 'Bean and Brew Cafe'}
      DESCRIPTION:${formData.additionalInfo}
      END:VEVENT
      END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.event}.ics`;
    a.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventRef = doc(db, 'eventRegistrations', new Date().toISOString());
      await setDoc(eventRef, {
        ...formData,
        userId: user ? user.uid : 'guest',
        timestamp: new Date()
      });

      emailjs.send('service_5afacpg', 'template_g720yap', formData, 'dSNPltwRo7CXDhHKR')
        .then((result) => {
          console.log('EmailJS result:', result.text);
        }, (error) => {
          console.error('EmailJS error:', error.text);
        });

      setMessage(formData.location === 'Virtual'
        ? 'Registration successful! A receipt has been sent to your email, and a virtual meeting invite will be shared later.'
        : 'Registration successful! A receipt has been sent to your email.');
      handleDownloadICS(); // Download the .ics file

      setFormData({
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        event: '',
        date: '',
        location: '',
        additionalInfo: '',
        attendees: 1
      });
      setSelectedEvent(null);

    } catch (error) {
      console.error('Firestore error:', error);
      setMessage('Error registering event. Please try again.');
    }

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Event Registration</h2>
      {message && <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

      {!selectedEvent ? (
        <div className="row">
          {futureEvents.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={event.image} className="card-img-top" alt={event.caption} />
                <div className="card-body">
                  <h5 className="card-title">{event.caption}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text"><small className="text-muted">{new Date(event.date).toDateString()}</small></p>
                  <button className="btn btn-primary" onClick={() => handleEventSelection(event)}>Register</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button className="btn btn-secondary mb-4" onClick={() => setSelectedEvent(null)}>Back to Events</button>
          <div className="row">
            <div className="col-md-3">
              <h5>Past Events</h5>
              {pastEvents.map((event) => (
                <div key={event.id} className="card mb-4">
                  <img src={event.imageUrl} className="card-img-top" alt={event.title} />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text"><small className="text-muted">{event.date}</small></p>
                  </div>
                </div>
              ))}
              <Link to="/gallery" className="btn btn-primary">View More</Link>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter your first name.</div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      />
                                          <div className="invalid-feedback">Please enter your last name.</div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly={!!user}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Please enter a valid email address.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="event">Event</label>
                  <input
                    type="text"
                    className="form-control"
                    id="event"
                    name="event"
                    value={formData.event}
                    readOnly
                    required
                  />
                  <div className="invalid-feedback">Please enter the event name.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    readOnly
                    required
                  />
                  <div className="invalid-feedback">Please enter the event date.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <select
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="In-person">In-person</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                  <div className="invalid-feedback">Please select a location.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="attendees">Number of Attendees</label>
                  <input
                    type="number"
                    className="form-control"
                    id="attendees"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                  <div className="invalid-feedback">Please enter the number of attendees.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="additionalInfo">Additional Information</label>
                  <textarea
                    className="form-control"
                    id="additionalInfo"
                    name="additionalInfo"
                    rows="3"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
            </div>
            <div className="col-md-3">
              <div className="card">
                <img src={selectedEvent.image} className="card-img-top" alt={selectedEvent.caption} />
                <div className="card-body">
                  <h5 className="card-title">{selectedEvent.caption}</h5>
                  <p className="card-text">{selectedEvent.description}</p>
                  <p className="card-text"><small className="text-muted">{new Date(selectedEvent.date).toDateString()}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;