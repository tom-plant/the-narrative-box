// GenerateButton.jsx

import React, { useState } from 'react';
import './GenerateButton.css';

function GenerateButton({ onGenerateClick }) {
  const [buttonText, setButtonText] = useState('Generate Information'); // Initialize button text
  const [buttonClicked, setButtonClicked] = useState(false); // Initialize button click state

  const handleGenerateClick = () => {
    onGenerateClick(); // Trigger the click event

    if (!buttonClicked) {
      setButtonText('More Information'); // Change the button text after the first click
      setButtonClicked(true); // Update button click state
    }
  };

  return (
    <button className="generate-button" onClick={handleGenerateClick}>
      {buttonText}
    </button>
  );
}

export default GenerateButton;
