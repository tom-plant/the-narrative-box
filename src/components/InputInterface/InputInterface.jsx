// InputInterface.jsx

import React, { useState } from 'react';
import TextEntryBox from './TextEntryBox';
import GenerateButton from './GenerateButton';
import AvailableInformation from './AvailableInformation/AvailableInformation';
import NarrativeButton from './NarrativeButton';
import './InputInterface.css';

function InputInterface() {
  const [factCount, setFactCount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click
  const [selectedBoxCount, setSelectedBoxCount] = useState(0); // State to track selected box count

  const handleGenerateClick = () => {
    // Check if factCount is less than 30 before incrementing
    if (factCount < 30) {
      const newFactCount = factCount + 6;
      // Cap the count at 36 if it exceeds
      setFactCount(newFactCount > 30 ? 30 : newFactCount);
    }
    // Set the state to indicate the button has been clicked
    setIsButtonClicked(true);
  };

  // Function to handle changes in selected box count
  const handleBoxSelectionChange = (count) => {
    setSelectedBoxCount(count);
  };

  return (
    <div className="input-interface">
      <TextEntryBox />
      <GenerateButton onGenerateClick={handleGenerateClick} />
      <AvailableInformation 
        factCount={factCount}
        isButtonClicked={isButtonClicked} /* Pass isButtonClicked as a prop */
        onBoxSelectionChange={handleBoxSelectionChange} // Pass the handler to AvailableInformation
        /> 
        {selectedBoxCount > 1 && <NarrativeButton />} {/* Render the button conditionally */}
    </div>
  );
}

export default InputInterface;
