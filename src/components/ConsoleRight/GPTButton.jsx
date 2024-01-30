// GPTButton.jsx 

import React, { useState, useEffect, useRef } from 'react';
import './GPTButton.css';

function GPTButton({ onClick, selectedFactBoxes }) {
  const [isPulsing, setIsPulsing] = useState(false); // State to control the animation
  const previousSelectedFactBoxes = useRef([]); // Ref to keep track of the previous selectedFactBoxes array

  useEffect(() => {
    // Ensure selectedFactBoxes is an array before comparing
    if (Array.isArray(selectedFactBoxes)) {
      // Check if the current selectedFactBoxes are different from the previous ones
      const areArraysDifferent = !arraysAreEqual(
        previousSelectedFactBoxes.current,
        selectedFactBoxes
      );

      // console.log('Previous:', previousSelectedFactBoxes.current);
      // console.log('Current:', selectedFactBoxes);
      // console.log('Are arrays different:', areArraysDifferent);

      if (areArraysDifferent) {
        // Trigger the animation class when there's a change
        setIsPulsing(true);
      }

      // Update the previousSelectedFactBoxes ref with a copy of the current selectedFactBoxes array
      previousSelectedFactBoxes.current = [...selectedFactBoxes];
    }
  }, [selectedFactBoxes]);

  // Helper function to check if two arrays are equal
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const handleButtonClick = () => {
    // Send a signal to the backend when the button is clicked
    // You can call the `onClick` callback to handle the button click action
    if (onClick) {
      setIsPulsing(false); // Toggle off the animation immediately
      onClick();
    }
  };

  return (
    <button
      className={`gpt-button ${isPulsing ? 'pulsing' : ''}`} // Add 'animate' class conditionally
      onClick={handleButtonClick}
    >
      Generate Narrative
    </button>
  );
}

export default GPTButton;