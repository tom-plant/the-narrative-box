// InputInterface.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

import TextEntryBox from './TextEntryBox';
import InfoButton from './InfoButton';
import AvailableInformation from './AvailableInformation/AvailableInformation';
import NarrativeButton from './NarrativeButton';
import './InputInterface.css';

function InputInterface({ showConsoleRight, showConsoleLeft, factTexts, onReceiveSelectedFactBoxes, getRevealedBoxCount, onNarrativeButtonClick, onPulsingStateChange, onSubFactsReceived, onReceiveUserInput }) {
  const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false); // State to track Generate Information button click
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to disable the Generate Information button
  const [isNarrativeButtonClicked, setNarrativeButtonClicked] = useState(false); // State to track the Generate Narrative button click
  const [selectedBoxCount, setSelectedBoxCount] = useState(0); // State to track selected box count
  const [remainingFacts, setRemainingFacts] = useState(null); // State to track when fact generation is exhausted
  const [selectedfactboxes, setSelectedFactBoxes] = useState([]); // State to track selected fact boxes
  const [userInput, setUserInput] = useState(''); // State to store user's text entry
  const [previousUserInput, setPreviousUserInput] = useState('');
 
  // Function to send user input to the server
  const sendUserInputToServer = async () => {
    try {
      // Check if the current input is different from the previous input before prompting ChatGPT
      if (userInput !== previousUserInput && userInput) {
        console.log('User input is new and empty!')
        const response = await axios.post('http://localhost:5000/generate-fact-boxes', {
          userInput: userInput,
      });

      // Handle the response from the server
      const responseData = response.data;

      // Check the data type of responseData.subFacts
      // console.log('Data type of responseData.subFacts:', typeof responseData.subFacts);
      // Log responseData.subFacts to see what's being received
      // console.log('Received Sub-Facts on Client:', responseData.subFacts);


      // Check if there was an error on the server
      if (responseData.error) {
        console.error('Error from server:', responseData.error);
        // Handle the error here, e.g., display an error message to the user
      } else {
        // Server successfully processed the request
        const generatedSubFactsString = responseData.subFacts;
        // console.log('Generated Sub-Facts String:', generatedSubFactsString);

        // Split the string into an array of sub-facts on the client side
        const generatedSubFactsArray = generatedSubFactsString.split(/\d+\.\s+/);
        // console.log('Generated Sub-Facts Array on Client:', generatedSubFactsArray);


        // Remove the empty first element, if it exists
        if (generatedSubFactsArray.length > 0 && generatedSubFactsArray[0] === '') {
          generatedSubFactsArray.shift(); // Remove the first element
        }
        
        // Update the previous input text
        setPreviousUserInput(userInput);
        onReceiveUserInput(userInput);

        // Call the callback function with the generated sub-facts
        onSubFactsReceived(generatedSubFactsArray);
      }
     }
    } catch (error) {
      console.error('Error sending user input to the server:', error);
      // Handle the error here, e.g., display an error message to the user
    }
  };


// Callback function to handle remainingFactCount received from AvailableInformation
  const handleRemainingFactCount = (count) => { //I think this 'count' is equivalent to remainingFactCount in availableinformation
    // Calculate the number of revealed boxes
    const revealedBoxCount = 30 - count;
    setRemainingFacts(count);
    console.log('Remaining fact count:',remainingFacts)
    getRevealedBoxCount(revealedBoxCount); 
  };
  
// Generate Information Button
  const handleInfoClick = () => {
    // Disable Generate Information Button
    if (remainingFacts === 0) {
      // Disable the button if the factCount reaches 30
      setButtonDisabled(true);
      console.log("Button disabled!"); // Add a console log to check if the button is disabled
      return;
    }

    // Set the state to indicate the Generate Information button has been clicked
    setIsInfoButtonClicked(!isInfoButtonClicked);
    console.log("Generate Information button clicked!"); // Add a console log to check if the button is clicked
    // setTimeout(() => {
    //   setIsInfoButtonClicked(false);
    // }, 500);
  };

  // Fact Box Selection Counter
const handleBoxSelectionChange = (count) => {
  setSelectedBoxCount(count);
};


// Generate Narrative Button Click 
  const handleNarrativeClick = () => {
    setNarrativeButtonClicked(true); // Set the state to signal the button click
 // Automatically reset isNarrativeButtonClicked to false after a delay 
    onNarrativeButtonClick(true);     // Call the callback function and pass isNarrativeButtonClicked

    setTimeout(() => {
      setNarrativeButtonClicked(false);
    }, .5); // Adjust the delay duration as needed
  };

 // Callback function to receive selected fact boxes
  const receiveSelectedFactBoxes = (selectedFactBoxes, unselectedFactBoxes) => {
  //  console.log("Received selected fact boxes:", selectedFactBoxes, "Received unselected fact boxes:", unselectedFactBoxes);
    // You can use the prop `onReceiveSelectedFactBoxes` for this purpose
    setSelectedFactBoxes(selectedFactBoxes); // Update the selectedfactboxes state when it changes
    onReceiveSelectedFactBoxes(selectedFactBoxes, unselectedFactBoxes);
  };

   // Callback function to update selectedFactBoxes in the parent component
   const handleSelectedFactBoxesChange = (newSelectedFactBoxes) => {
    setSelectedFactBoxes(newSelectedFactBoxes);
  };

    // Callback function to receive pulsing state change from NarrativeButton
    const handlePulsingStateChange = (isPulsing) => {
      // Handle the pulsing state change in the parent component
      // console.log('Pulsing State Changed:', isPulsing);
      // You can pass this state change further up the component tree as needed
      onPulsingStateChange(isPulsing);
    };
  

  return (
    <div className="input-interface">
      <TextEntryBox 
        setUserInput={setUserInput}
      />
      <InfoButton
        onInfoClick={handleInfoClick} // Pass the callback function
        disabled={buttonDisabled} // Pass the disabled state to the Generate Information Button
        userInput={userInput}
        sendUserInputToServer={sendUserInputToServer}
      />
      <AvailableInformation
        isInfoButtonClicked={isInfoButtonClicked} // Pass isInfoButtonClicked as a prop 
        isNarrativeButtonClicked={isNarrativeButtonClicked} // Pass the signal as a prop
        onBoxSelectionChange={handleBoxSelectionChange} // Pass the handler to AvailableInformation
        onUpdateSelectedBoxCount={setSelectedBoxCount} // Pass the function
        factTexts={factTexts} // Pass fact texts to AvailableInformation
        onRemainingFactCount={handleRemainingFactCount}
        onGenerateNarrative={receiveSelectedFactBoxes}
        onSelectedFactBoxesChange={handleSelectedFactBoxesChange}
        userInput={userInput}
      />
      {selectedBoxCount > 2 && ( 
        <NarrativeButton
          showConsoleRight={showConsoleRight} 
          showConsoleLeft={showConsoleLeft}
          onNarrativeClick={handleNarrativeClick} // Pass the function to NarrativeButton
          selectedFactBoxes={selectedfactboxes} // Pass the selectedFactBoxes prop
          onPulsingStateChange={handlePulsingStateChange} // Pass the callback function
        />
      )}
    </div>
  );
}

export default InputInterface;
