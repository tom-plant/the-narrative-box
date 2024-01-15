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
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to disable the button

  const handleGenerateClick = () => {
    if (factCount >= 30) {
      // Disable the button if the factCount reaches 30
      setButtonDisabled(true);
      console.log("Button disabled!"); // Add a console log to check if the button is disabled
      return;
    }

    const newFactCount = factCount + 6;
    // Cap the count at 30 if it exceeds
    setFactCount(newFactCount > 30 ? 30 : newFactCount);

    // Set the state to indicate the button has been clicked
    setIsButtonClicked(true);
    console.log("Button clicked!"); // Add a console log to check if the button is clicked
  };

  // Function to handle changes in selected box count
  const handleBoxSelectionChange = (count) => {
    setSelectedBoxCount(count);
  };

  return (
    <div className="input-interface">
      <TextEntryBox />
      <GenerateButton
        onGenerateClick={handleGenerateClick}
        disabled={buttonDisabled} // Pass the disabled state to the GenerateButton
      />
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
