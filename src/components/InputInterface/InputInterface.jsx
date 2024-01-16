// InputInterface.jsx

import React, { useState } from 'react';
import TextEntryBox from './TextEntryBox';
import GenerateButton from './GenerateButton';
import AvailableInformation from './AvailableInformation/AvailableInformation';
import NarrativeButton from './NarrativeButton';
import './InputInterface.css';

function InputInterface({ toggleConsoles, showConsoleRight, showConsoleLeft, factTexts }) {
  const [factCount, setFactCount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track Generate Information button click
  const [selectedBoxCount, setSelectedBoxCount] = useState(0); // State to track selected box count
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to disable the Generate Information button

// Generate Information Button
  const handleGenerateClick = () => {
    // Disable Generate Information Button
    if (factCount >= 30) { // Disable the button if the factCount reaches 30
      setButtonDisabled(true);
      console.log("Button disabled!"); // Add a console log to check if the button is disabled
      return;
    }
    // Count Fact Boxes and cap at 30
    const newFactCount = factCount + 6;
    setFactCount(newFactCount > 30 ? 30 : newFactCount);

    // Set the state to indicate the Generate Information button has been clicked
    setIsButtonClicked(true);
    console.log("Button clicked!"); // Add a console log to check if the button is clicked
  };

// Fact Box Selection
  const handleBoxSelectionChange = (count) => {
    setSelectedBoxCount(count);
  };


  return (
    <div className="input-interface">
      <TextEntryBox />
      <GenerateButton
        onGenerateClick={handleGenerateClick} // Pass the callback function
        disabled={buttonDisabled} // Pass the disabled state to the Generate Information Button
      />
      <AvailableInformation
        factCount={factCount}
        isButtonClicked={isButtonClicked} // Pass isButtonClicked as a prop 
        onBoxSelectionChange={handleBoxSelectionChange} // Pass the handler to AvailableInformation
        factTexts={factTexts} //Pass fact texts to AvailableInformation
      />
      {selectedBoxCount > 1 && (
        <NarrativeButton
          toggleConsoleRight={toggleConsoles} // Pass the callback function
          showConsoleRight={showConsoleRight} 
          showConsoleLeft={showConsoleLeft}
        />
      )}
    </div>
  );
}

export default InputInterface;
