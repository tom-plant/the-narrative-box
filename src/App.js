// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';
import ConsoleRight from './components/ConsoleRight/ConsoleRight';
import ConsoleLeft from './components/ConsoleLeft/ConsoleLeft';


function App() {
  const [isConsoleRightVisible, setConsoleRightVisible] = useState(false);
  const [isConsoleLeftVisible, setConsoleLeftVisible] = useState(false);
  const [selectedFactBoxes, setSelectedFactBoxes] = useState([]);
  const [unselectedFactBoxes, setUnSelectedFactBoxes] = useState([]);
  const [revealedBoxCount, setRevealedBoxCount] = useState(0); // Initialize with 0
  const [isGPTButtonClicked, setIsGPTButtonClicked] = useState(false);
  const [isNarrativeButtonClicked, setIsNarrativeButtonClicked] = useState(false);
  const [pulsingState, setPulsingState] = useState(false); 
  const [factTexts, setFactTexts] = useState([]);
  const [autoSelectedFactBoxes, setAutoSelectedFactBoxes] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [receivedAutoNarrative, setReceivedAutoNarrative] = useState('');

  // Callback function to receive Autoselected Narrative from ConsoleRight
  const onAutoNarrativeReceived = (narrative2) => {
    setReceivedAutoNarrative(narrative2);
    console.log('narrative2 received in app.js')
  };

 // Callback function to receive and process subFactsArray from InputInterface
 const handleSubFactsReceived = (generatedSubFactsArray) => {
  // Process the subFactsArray as needed
  console.log('Received Sub-Facts Array in App.js:', generatedSubFactsArray);
  // Update the state with the processed subFactsArray
  setFactTexts(generatedSubFactsArray);
  };

  const handleReceiveUserInput = (userInput) => {
    console.log('Received UserInput in App.js:', userInput);
    setUserInput(userInput);
  }

  // Callback function to update finalFactBoxes when called by child components
  const receiveAutoSelectedFactBoxes = (finalFactBoxes) => {
    console.log('Received autoselectedfact boxes in App.js:', finalFactBoxes);
    setAutoSelectedFactBoxes(finalFactBoxes);
    // console.log('AutoSelected boxes in app.js:',AutoSelectedFactBoxes);
  };

  // Console Visibility
  const showConsoleRight = () => {
    console.log('showConsoleRight called');
    setConsoleRightVisible(true);
  };
  const showConsoleLeft = () => {
    console.log('showConsoleLeft called');
    setConsoleLeftVisible(true);
  };

  const receiveSelectedFactBoxes = (selectedFactBoxes, unselectedFactBoxes) => {
    
    setSelectedFactBoxes((prevSelectedFactBoxes) => {
      // Update only if the new state is different from the previous state
      if (prevSelectedFactBoxes !== selectedFactBoxes) {
        return selectedFactBoxes;
      }
      return prevSelectedFactBoxes;
    });

    setUnSelectedFactBoxes((prevUnselectedFactBoxes) => {
      // Update only if the new state is different from the previous state
      if (prevUnselectedFactBoxes !== unselectedFactBoxes) {
        return unselectedFactBoxes;
      }
      return prevUnselectedFactBoxes;
    });
  };

    const getRevealedBoxCount = (count) => {
      setRevealedBoxCount(count);
        //  console.log("Revealed Box Count in App.js:", count);
    };

    const handleGPTButtonClick = () => {
    setIsGPTButtonClicked(true);
    // console.log("GPTButton clicked in App.js");
  };

  // Callback function to handle the "Generate Narrative" button click
  const handleNarrativeButtonClick = (isClicked) => {
    // Perform actions based on the button state
    if (isClicked) {
      setIsNarrativeButtonClicked(true);
      // console.log("Generate Narrative button clicked in App.js");
    }
  };

    // Callback function to receive pulsing state change from InputInterface
    const handlePulsingStateChange = (isPulsing) => {
      // Handle the pulsing state change in the App component
      // console.log('Pulsing State Changed (App.js):', isPulsing);
      setPulsingState(isPulsing);
    };


  return (
    <div className="App">
      <Header 
        isGPTButtonClicked={isGPTButtonClicked} // Pass the state as a prop
      />
      <div className="container">
        {isConsoleLeftVisible && <ConsoleLeft 
          unselectedFactBoxes={unselectedFactBoxes}
          selectedFactBoxes={selectedFactBoxes}
          revealedBoxCount={revealedBoxCount}
          factTexts={factTexts}
          isGPTButtonClicked={isGPTButtonClicked} // Pass the state as a prop
          isConsoleLeftVisible={isConsoleLeftVisible}
          isNarrativeButtonClicked={isNarrativeButtonClicked} // Pass the state as a prop
          onReceiveAutoSelectedFactBoxes={receiveAutoSelectedFactBoxes} // Pass the callback function
          receivedAutoNarrative={receivedAutoNarrative}
          />}
        <InputInterface
          showConsoleRight={showConsoleRight} // Pass the callback function
          showConsoleLeft={showConsoleLeft} // Pass the callback function
          factTexts={factTexts} // pass array of fact box texts as a prop
          onReceiveSelectedFactBoxes={receiveSelectedFactBoxes} // Pass the callback function
          getRevealedBoxCount={getRevealedBoxCount}
          onNarrativeButtonClick={handleNarrativeButtonClick} // Pass the callback function
          onPulsingStateChange={handlePulsingStateChange} // Pass the callback function
          onSubFactsReceived={handleSubFactsReceived} // Pass the callback function
          onReceiveUserInput={handleReceiveUserInput} //
        />
        {isConsoleRightVisible && <ConsoleRight 
        selectedFactBoxes={selectedFactBoxes} 
        onGPTButtonClick={handleGPTButtonClick} // Pass the callback function
        pulsingState={pulsingState} // Pass the pulsing state as a prop
        autoSelectedFactBoxes={autoSelectedFactBoxes}
        userInput={userInput} 
        onAutoNarrativeReceived={onAutoNarrativeReceived} // Pass the callback function
        />}
      </div>
    </div>
  );
}

export default App;
