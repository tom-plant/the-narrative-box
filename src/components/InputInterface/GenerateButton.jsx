// GenerateButton.jsx

import React, { useState } from 'react';
import './GenerateButton.css';

function GenerateButton({ onGenerateClick, disabled }) {
  const [buttonText, setButtonText] = useState('Generate Information'); // Initialize button text
  const [buttonClicked, setButtonClicked] = useState(false); // Initialize button click state

  const handleGenerateClick = () => {
    if (disabled) {
      // If disabled, trigger the animation and return without generating more boxes
      setButtonClicked(true);
      setTimeout(() => setButtonClicked(false), 200); // Reset animation after 200ms
    } else {
      onGenerateClick(); // Trigger the click event
      if (!buttonClicked) {
        setButtonText('More Information'); // Change the button text after the first click
        setButtonClicked(true); // Update button click state
      }
    }
  };

  return (
    <button className={`generate-button ${buttonClicked && disabled ? 'bump' : ''}`} onClick={handleGenerateClick}>
      {buttonText}
    </button>
  );
}

export default GenerateButton;
