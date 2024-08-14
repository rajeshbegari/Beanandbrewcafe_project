import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl, title, description, date }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <h2>{title}</h2>
        <div
          className={`image-container ${isZoomed ? 'zoomed' : ''}`}
          onClick={handleImageClick}
        >
          <img src={imageUrl} alt={title} className="modal-image" />
        </div>
        <div className="image-details">
          <p>{description}</p>
          <p><strong>{date}</strong></p>
        </div>
        <button onClick={onRequestClose} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default ImageModal;
