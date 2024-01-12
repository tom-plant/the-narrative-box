//GenerateButton.jsx

import React from 'react';
import './GenerateButton.css';

function GenerateButton({ onGenerateClick }) {
  const handleGenerateClick = () => {
    onGenerateClick(); // Just trigger the click, don't pass a specific count
  };

  return (
    <button className="generate-button" onClick={handleGenerateClick}>
      Generate Information
    </button>
  );
}

export default GenerateButton;
