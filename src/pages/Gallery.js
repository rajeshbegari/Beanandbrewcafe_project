import React, { useState } from 'react';
import ife1 from '../images/ife1.jpeg';
import ife3 from '../images/ife3.jpeg';
import ife4 from '../images/ife4.jpeg';
import ife5 from '../images/ife5.jpeg';
import ife6 from '../images/ife6.jpeg';
import ife7 from '../images/ife7.jpeg';
import ife8 from '../images/ife8.jpeg';
import ife9 from '../images/ife9.jpeg';
import ife10 from '../images/ife10.jpeg';
import ife11 from '../images/ife11.jpeg';
import ife12 from '../images/ife12.jpeg';
import ife13 from '../images/ife13.jpeg';
import '../styles.css';
import ImageModal from '../components/ImageModal';

const Gallery = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const events = [
    {
      id: 1,
      title: "Coffee Tasting Event",
      description: "An amazing coffee tasting event where participants enjoyed various coffee blends.",
      date: "March 12, 2023",
      imageUrl: ife1,
    },
    {
      id: 2,
      title: "Latte Art Workshop",
      description: "Learn the art of making lattes with beautiful designs in this hands-on workshop.",
      date: "April 5, 2023",
      imageUrl: ife6,
    },
    {
      id: 3,
      title: "Coffee Brewing Techniques",
      description: "Discover various coffee brewing techniques from pour-over to French press.",
      date: "May 20, 2023",
      imageUrl: ife3,
    },
    {
      id: 4,
      title: "Espresso Masterclass",
      description: "Become an expert in making espressos with our detailed masterclass.",
      date: "June 15, 2023",
      imageUrl: ife4,
    },
    {
      id: 5,
      title: "Barista Training",
      description: "Train to become a professional barista and master the art of coffee making.",
      date: "July 10, 2023",
      imageUrl: ife5,
    },
    {
      id: 6,
      title: "Coffee Culture Discussion",
      description: "Discuss the history and culture of coffee with enthusiasts and experts.",
      date: "August 5, 2023",
      imageUrl: ife13,
    },
    {
      id: 7,
      title: "Holiday Coffee Specials",
      description: "Celebrate the holidays with our special coffee blends and festive treats.",
      date: "December 20, 2022",
      imageUrl: ife7,
    },
    {
      id: 8,
      title: "Outdoor Coffee Picnic",
      description: "Enjoy a relaxing picnic with coffee and pastries in the great outdoors.",
      date: "September 14, 2022",
      imageUrl: ife8,
    },
    {
      id: 9,
      title: "Coffee and Dessert Pairing",
      description: "Pair delicious desserts with the perfect coffee in this delightful event.",
      date: "October 11, 2022",
      imageUrl: ife9,
    },
    {
      id: 10,
      title: "Coffee Bean Roasting",
      description: "Learn the process of roasting coffee beans and enjoy freshly roasted coffee.",
      date: "November 7, 2022",
      imageUrl: ife10,
    },
    {
      id: 11,
      title: "Coffee History Seminar",
      description: "A seminar discussing the rich history of coffee around the world.",
      date: "January 15, 2023",
      imageUrl: ife11,
    },
    {
      id: 12,
      title: "Monthly Coffee Meet-up",
      description: "Join our monthly meet-up to share and enjoy different coffee experiences.",
      date: "February 10, 2023",
      imageUrl: ife12,
    }
  ];

  const openModal = (imageUrl, title, description, date) => {
    setSelectedImage(imageUrl);
    setSelectedTitle(title);
    setSelectedDescription(description);
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
    setSelectedTitle('');
    setSelectedDescription('');
    setSelectedDate('');
  };

  return (
    <div className="container gallery-container">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {events.map(event => (
          <div key={event.id} className="gallery-item" onClick={() => openModal(event.imageUrl, event.title, event.description, event.date)}>
            <img src={event.imageUrl} alt={event.title} className="gallery-image"/>
            <div className="gallery-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>{event.date}</strong></p>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImage}
          title={selectedTitle}
          description={selectedDescription}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default Gallery;