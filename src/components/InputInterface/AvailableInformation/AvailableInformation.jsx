import React, { useState } from 'react';
import FactBox from './FactBox';
import './AvailableInformation.css';

function AvailableInformation({ factCount }) {
  const [boxClicked, setBoxClicked] = useState(new Array(factCount).fill(false));
  const [clickCount, setClickCount] = useState(0);

  const factBoxes = [];

  const handleBoxClick = (index) => {
    const updatedClickedState = [...boxClicked];
    updatedClickedState[index] = !updatedClickedState[index];

    // Calculate the new click count based on the updated state
    const newClickCount = updatedClickedState.filter((clicked) => clicked).length;

    // Check if the new click count is within the limit (0 to 5)
    if (newClickCount <= 5) {
      setBoxClicked(updatedClickedState);
      setClickCount(newClickCount);
    }
  };

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
      {factBoxes.length > 0 && factBoxes}
    </div>
  );
}

export default AvailableInformation;
