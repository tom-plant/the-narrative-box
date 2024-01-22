// GPTButton.jsx 

import React from 'react';
import './GPTButton.css';

function GPTButton({ onClick }) {
  const handleButtonClick = () => {
    // Send a signal to the backend when the button is clicked
    // You can call the `onClick` callback to handle the button click action
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="gpt-button" onClick={handleButtonClick}>
      Generate Narrative
    </button>
  );
}

export default GPTButton;