// NarrativeButton.jsx

import React from 'react';
import './NarrativeButton.css';

function NarrativeButton({ showConsoleRight, showConsoleLeft, unrenderSelectedBoxes }) {

// Reveal Left and Right Consoles on click
  const handleNarrativeClick = () => {
    showConsoleRight(); // Call the callback function to show ConsoleRight
    showConsoleLeft(); // Call the callback function to show ConsoleLeft
    unrenderSelectedBoxes();
  };

  
  return (
    <button className="narrative-button" onClick={handleNarrativeClick}>
      Generate Narrative
    </button>
  );
}

export default NarrativeButton;
