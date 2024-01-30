// NarrativeButton.jsx

import React, { useState, useEffect, useRef } from 'react';
import './NarrativeButton.css';

function NarrativeButton({ showConsoleRight, showConsoleLeft, onNarrativeClick, selectedFactBoxes }) {
  const [isPulsing, setIsPulsing] = useState(false); // State to control the animation
  const prevSelectedFactBoxesRef = useRef(selectedFactBoxes);

  console.log('here',selectedFactBoxes)

// Reveal Left and Right Consoles on click
  const handleNarrativeClick = () => {
    showConsoleRight(); // Call the callback function to show ConsoleRight
    showConsoleLeft(); // Call the callback function to show ConsoleLeft
    onNarrativeClick();

      // Delay the animation stop by 1 second (adjust the duration as needed)
      setTimeout(() => {
       setIsPulsing(false); // Stop the animation after the delay
       console.log('Animation stopped');
  }, 500); // delay
};


  useEffect(() => {
    console.log('PassSelectedBoxes prop updated');
    if (selectedFactBoxes !== prevSelectedFactBoxesRef.current) {
      // When PassSelectedBoxes is called, start or continue the animation
      setIsPulsing(true);
      console.log('Animation started');
    }

    // Update the ref with the current selectedFactBoxes value
    prevSelectedFactBoxesRef.current = selectedFactBoxes;
  }, [selectedFactBoxes, onNarrativeClick]);
  
  return (
    <button
      className={`narrative-button ${isPulsing ? 'pulsing' : ''}`} // Add 'pulsing' class conditionally
      onClick={handleNarrativeClick}
    >
      Next
    </button>
  );
}

export default NarrativeButton;
