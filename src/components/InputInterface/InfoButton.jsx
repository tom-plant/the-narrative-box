// InfoButton.jsx

import React, { useState } from 'react';
import './InfoButton.css';

function InfoButton({ onInfoClick, disabled }) {
  const [buttonText, setButtonText] = useState('Generate Information'); // Initialize button text
  const [buttonClicked, setButtonClicked] = useState(false); // Initialize button click state

  const handleInfoClick = () => {
    if (disabled) {
      // If disabled, trigger the animation and return without generating more boxes
      setButtonClicked(true);
      setTimeout(() => setButtonClicked(false), 200); // Reset animation after 200ms
    } else {
      onInfoClick(); // Trigger the click event
      if (!buttonClicked) {
        setButtonText('More Information'); // Change the button text after the first click
        setButtonClicked(true); // Update button click state
      }
    }
  };

  return (
    <button className={`info-button ${buttonClicked && disabled ? 'bump' : ''}`} onClick={handleInfoClick}>
      {buttonText}
    </button>
  );
}

export default InfoButton;
