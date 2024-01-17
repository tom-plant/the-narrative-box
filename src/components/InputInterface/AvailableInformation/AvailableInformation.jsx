//AvailableInformation.jsx

import React, { useState, useEffect } from 'react';
import FactBox from './FactBox';
import './AvailableInformation.css';

function AvailableInformation({ factCount, isInfoButtonClicked, onBoxSelectionChange, factTexts }) {
  const [boxClicked, setBoxClicked] = useState(new Array(factCount).fill(false)); // State to track which boxes are clicked
  const [clickCount, setClickCount] = useState(0); // State to track the number of clicks

// Counter for tracking how many Fact Boxes are selected 
  useEffect(() => {
    if (isInfoButtonClicked) {  // Initialize the counter upon click
      setClickCount(0); // Set click count to 0
    }
  }, [isInfoButtonClicked]);

// Hande clicking a Fact Box
  const handleBoxClick = (index) => {
    if (!isInfoButtonClicked) {
      // If the button has not been clicked, return early to avoid handling clicks
      return;
    }

    // Update the clicked state for the clicked box
    const updatedClickedState = [...boxClicked];
    updatedClickedState[index] = !updatedClickedState[index];

    // Calculate the new click count
    const newClickCount = updatedClickedState.filter((clicked) => clicked).length;

    if (newClickCount <= 5) {
      setBoxClicked(updatedClickedState);
      setClickCount(newClickCount);
      onBoxSelectionChange(newClickCount);
    }
  };

// Display the counter and select text based on button click
  const counter = isInfoButtonClicked ? `${clickCount}/5` : null; // Only display counter if the button has been clicked
  const selectText = isInfoButtonClicked ? "Select up to five pieces of information" : null; // Display the text when the button is clicked
  
// Generate Fact Box components based on factCount and factTexts
  const factBoxes = [];
  for (let i = 0; i < factCount; i++) {
    const boxClass = boxClicked[i] ? 'fact-box clicked' : 'fact-box';

    factBoxes.push(
      <div key={i} className={boxClass} onClick={() => handleBoxClick(i)}>
        <FactBox text={factTexts[i]} /> {/* Pass unique text as a prop */}
      </div>
    );
  }


  return (
    <div className="available-information">
      {/* Display the counter if the button has been clicked */}
      <div className="counter">{counter}</div>

      {/* Display the select text if the button is clicked */}
      {selectText && <div className="select-text">{selectText}</div>}

      {/* Display the fact boxes */}
      {factBoxes.length > 0 && factBoxes}
    </div>
  );
}

export default AvailableInformation;
