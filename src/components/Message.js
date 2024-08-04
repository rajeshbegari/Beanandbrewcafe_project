// src/components/Message.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css'

const Message = ({ message, type }) => {
  if (!message) return null;

  const messageClass = type === 'error' ? 'alert alert-danger' : 'alert alert-info';

  return (
    <div className={messageClass}>
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'error']).isRequired,
};

export default Message;