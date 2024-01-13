import React from 'react';
import './NarrativeButton.css'; // Import the CSS file

function NarrativeButton({ onButtonClick }) {
  const handleButtonClick = () => {
    onButtonClick(); // Trigger the button click action
  };

  return (
    <button className="narrative-button" onClick={handleButtonClick}>
      Generate Narrative
    </button>
  );
}

export default NarrativeButton;
