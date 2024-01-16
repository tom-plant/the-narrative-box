// NarrativeButton.jsx

import React from 'react';
import './NarrativeButton.css';

function NarrativeButton({ showConsoleRight }) {
  const handleNarrativeClick = () => {
    showConsoleRight(); // Call the callback function to show ConsoleRight
  };

  return (
    <button className="narrative-button" onClick={handleNarrativeClick}>
      Generate Narrative
    </button>
  );
}

export default NarrativeButton;
