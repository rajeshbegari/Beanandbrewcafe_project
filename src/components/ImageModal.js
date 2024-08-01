import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>{title}</h2>
        <img src={imageUrl} alt={title} className="modal-image" />
        <button onClick={onRequestClose} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default ImageModal;