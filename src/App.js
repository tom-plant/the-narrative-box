// App.js

import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';
import ConsoleRight from './components/ConsoleRight/ConsoleRight';
import ConsoleLeft from './components/ConsoleLeft/ConsoleLeft';

// // An array of unique text data for fact boxes
// const factTexts = [
//   "Fact Box 1 Text",
//   "Fact Box 2 Text",
//   "Fact Box 3 Text",
//   "Fact Box 4 Text",
//   "Fact Box 5 Text",
//   "Fact Box 6 Text",
//   "Fact Box 7 Text",
//   "Fact Box 8 Text",
//   "Fact Box 9 Text",
//   "Fact Box 10 Text",
//   "Fact Box 11 Text",
//   "Fact Box 12 Text",
//   "Fact Box 13 Text",
//   "Fact Box 14 Text",
//   "Fact Box 15 Text",
//   "Fact Box 16 Text",
//   "Fact Box 17 Text",
//   "Fact Box 18 Text",
//   "Fact Box 19 Text",
//   "Fact Box 20 Text",
//   "Fact Box 21 Text",
//   "Fact Box 22 Text",
//   "Fact Box 23 Text",
//   "Fact Box 24 Text",
//   "Fact Box 25 Text",
//   "Fact Box 26 Text",
//   "Fact Box 27 Text",
//   "Fact Box 28 Text",
//   "Fact Box 29 Text",
//   "Fact Box 30 Text"
// ];

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

 // Callback function to receive and process subFactsArray from InputInterface
 const handleSubFactsReceived = (generatedSubFactsArray) => {
  // Process the subFactsArray as needed
  console.log('Received Sub-Facts Array in App.js:', generatedSubFactsArray);

  // Update the state with the processed subFactsArray
  setFactTexts(generatedSubFactsArray);
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
        />
        {isConsoleRightVisible && <ConsoleRight 
        selectedFactBoxes={selectedFactBoxes} 
        onGPTButtonClick={handleGPTButtonClick} // Pass the callback function
        pulsingState={pulsingState} // Pass the pulsing state as a prop
        />}
      </div>
    </div>
  );
}

export default App;
