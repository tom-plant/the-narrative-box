// NarrativeButton.jsx

import React, { useState, useEffect } from 'react';
import './NarrativeButton.css';

function NarrativeButton({ showConsoleRight, showConsoleLeft, PassSelectedBoxes }) {
  const [isPulsing, setIsPulsing] = useState(false); // State to control the animation

// Reveal Left and Right Consoles on click
  const handleNarrativeClick = () => {
    showConsoleRight(); // Call the callback function to show ConsoleRight
    showConsoleLeft(); // Call the callback function to show ConsoleLeft
    PassSelectedBoxes();

      // Delay the animation stop by 1 second (adjust the duration as needed)
      setTimeout(() => {
       setIsPulsing(false); // Stop the animation after the delay
       console.log('Animation stopped');
  }, 500); // 1000 milliseconds (1 second) delay
};


  useEffect(() => {
    console.log('PassSelectedBoxes prop updated');
    // You can add your animation logic here or any other action you want to perform
    // When PassSelectedBoxes is called, start or continue the animation
    setIsPulsing(true);
    console.log('Animation started');
  }, [PassSelectedBoxes]);
  
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
