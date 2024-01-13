//AvailableInformation.jsx

import React, { useState, useEffect } from 'react';
import FactBox from './FactBox';
import './AvailableInformation.css';

function AvailableInformation({ factCount, isButtonClicked, onBoxSelectionChange }) {
  const [boxClicked, setBoxClicked] = useState(new Array(factCount).fill(false));
  const [clickCount, setClickCount] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // Check if the button has been clicked, and initialize the counter accordingly
    if (isButtonClicked) {
      setClickCount(0); // Initialize click count to 0 when the button is clicked
    }
  }, [isButtonClicked]);

  const handleBoxClick = (index) => {
    if (!isButtonClicked) {
      // If the button has not been clicked, return early to avoid handling clicks
      return;
    }

    const updatedClickedState = [...boxClicked];
    updatedClickedState[index] = !updatedClickedState[index];

    const newClickCount = updatedClickedState.filter((clicked) => clicked).length;

    if (newClickCount <= 5) {
      setBoxClicked(updatedClickedState);
      setClickCount(newClickCount);
      onBoxSelectionChange(newClickCount);
      setIsFlashing(false); // Reset flashing state
    } else {
      // If more than 5 boxes are selected, trigger flashing
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 3000); // Stop flashing after 3 seconds
    }
  };

  const counter = isButtonClicked ? `${clickCount}/5` : null; // Only display counter if the button has been clicked

  const selectText = isButtonClicked ? "Select up to five pieces of information" : null; // Display the text when the button is clicked

  const factBoxes = [];

  for (let i = 0; i < factCount; i++) {
    const boxClass = boxClicked[i] ? 'fact-box clicked' : 'fact-box';

    factBoxes.push(
      <div key={i} className={boxClass} onClick={() => handleBoxClick(i)}>
        <FactBox />
      </div>
    );
  }

  return (
    <div className="available-information">
      {/* Display the counter if the button has been clicked */}
      <div className={`counter ${isFlashing ? 'flashing' : ''}`}>{counter}</div>

      {/* Display the select text if the button is clicked */}
      {selectText && <div className="select-text">{selectText}</div>}

      {/* Display the fact boxes */}
      {factBoxes.length > 0 && factBoxes}
    </div>
  );
}

export default AvailableInformation;
