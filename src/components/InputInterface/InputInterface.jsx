// InputInterface.jsx

import React, { useState } from 'react';
import TextEntryBox from './TextEntryBox';
import InfoButton from './InfoButton';
import AvailableInformation from './AvailableInformation/AvailableInformation';
import NarrativeButton from './NarrativeButton';
import './InputInterface.css';

function InputInterface({ showConsoleRight, showConsoleLeft, factTexts, onReceiveSelectedFactBoxes, getRevealedBoxCount }) {
  const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false); // State to track Generate Information button click
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to disable the Generate Information button
  const [isNarrativeButtonClicked, setNarrativeButtonClicked] = useState(false); // State to track the Generate Narrative button click
  const [selectedBoxCount, setSelectedBoxCount] = useState(0); // State to track selected box count
  const [remainingFacts, setRemainingFacts] = useState(null); // State to track when fact generation is exhausted



// Function to handle remainingFactCount received from AvailableInformation
  const handleRemainingFactCount = (count) => {
    // Calculate the number of revealed boxes
    const revealedBoxCount = 30 - count;
    // Set the remaining facts count in the parent's state
    setRemainingFacts(count);
    getRevealedBoxCount(revealedBoxCount); 
  };
  
// Generate Information Button
  const handleInfoClick = () => {
    // Disable Generate Information Button
    if (remainingFacts === 6) {
      // Disable the button if the factCount reaches 30
      setButtonDisabled(true);
      console.log("Button disabled!"); // Add a console log to check if the button is disabled
      return;
    }

    // Set the state to indicate the Generate Information button has been clicked
    setIsInfoButtonClicked(true);
    console.log("Generate Information button clicked!"); // Add a console log to check if the button is clicked
    setTimeout(() => {
      setIsInfoButtonClicked(false);
    }, 100);
  };

  // Fact Box Selection Counter
const handleBoxSelectionChange = (count) => {
  setSelectedBoxCount(count);
};


// Generate Narrative Button Click 
  const PassSelectedBoxes = () => {
    setNarrativeButtonClicked(true); // Set the state to signal the button click
 // Automatically reset isNarrativeButtonClicked to false after a delay 
    setTimeout(() => {
      setNarrativeButtonClicked(false);
    }, 100); // Adjust the delay duration as needed
  };

 // Callback function to receive selected fact boxes
  const receiveSelectedFactBoxes = (selectedFactBoxes, unselectedFactBoxes) => {
  //  console.log("Received selected fact boxes:", selectedFactBoxes, "Received unselected fact boxes:", unselectedFactBoxes);
    // You can use the prop `onReceiveSelectedFactBoxes` for this purpose
    onReceiveSelectedFactBoxes(selectedFactBoxes, unselectedFactBoxes);
  };

  return (
    <div className="input-interface">
      <TextEntryBox />
      <InfoButton
        onInfoClick={handleInfoClick} // Pass the callback function
        disabled={buttonDisabled} // Pass the disabled state to the Generate Information Button
      />
      <AvailableInformation
        isInfoButtonClicked={isInfoButtonClicked} // Pass isInfoButtonClicked as a prop 
        isNarrativeButtonClicked={isNarrativeButtonClicked} // Pass the signal as a prop
        onBoxSelectionChange={handleBoxSelectionChange} // Pass the handler to AvailableInformation
        onUpdateSelectedBoxCount={setSelectedBoxCount} // Pass the function
        factTexts={factTexts} // Pass fact texts to AvailableInformation
        onRemainingFactCount={handleRemainingFactCount}
        onGenerateNarrative={receiveSelectedFactBoxes}
      />
      {selectedBoxCount > 2 && ( 
        <NarrativeButton
          showConsoleRight={showConsoleRight} 
          showConsoleLeft={showConsoleLeft}
          PassSelectedBoxes={PassSelectedBoxes} // Pass the function to NarrativeButton
        />
      )}
    </div>
  );
}

export default InputInterface;
