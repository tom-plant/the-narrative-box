// App.js

import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';
import ConsoleRight from './components/ConsoleRight/ConsoleRight';
import ConsoleLeft from './components/ConsoleLeft/ConsoleLeft';

// An array of unique text data for fact boxes
const factTexts = [
  "Fact Box 1 Text",
  "Fact Box 2 Text",
  "Fact Box 3 Text",
  "Fact Box 4 Text",
  "Fact Box 5 Text",
  "Fact Box 6 Text",
  "Fact Box 7 Text",
  "Fact Box 8 Text",
  "Fact Box 9 Text",
  "Fact Box 10 Text",
  "Fact Box 11 Text",
  "Fact Box 12 Text",
  "Fact Box 13 Text",
  "Fact Box 14 Text",
  "Fact Box 15 Text",
  "Fact Box 16 Text",
  "Fact Box 17 Text",
  "Fact Box 18 Text",
  "Fact Box 19 Text",
  "Fact Box 20 Text",
  "Fact Box 21 Text",
  "Fact Box 22 Text",
  "Fact Box 23 Text",
  "Fact Box 24 Text",
  "Fact Box 25 Text",
  "Fact Box 26 Text",
  "Fact Box 27 Text",
  "Fact Box 28 Text",
  "Fact Box 29 Text",
  "Fact Box 30 Text"
];

function App() {
  const [isConsoleRightVisible, setConsoleRightVisible] = useState(false);
  const [isConsoleLeftVisible, setConsoleLeftVisible] = useState(false);
  const [selectedFactBoxes, setSelectedFactBoxes] = useState([]);
  const [unselectedFactBoxes, setUnSelectedFactBoxes] = useState([]);
  const [revealedBoxCount, setRevealedBoxCount] = useState(0); // Initialize with 0
  const [isGPTButtonClicked, setIsGPTButtonClicked] = useState(false);
  const [isNarrativeButtonClicked, setIsNarrativeButtonClicked] = useState(false);


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
    console.log('receiveSelectedFactBoxes called');
    
    // Use functional updates to avoid depending on the previous state
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
      // This function can now receive the revealedBoxCount from InputInterface
      setRevealedBoxCount(count);
      console.log('getRevealedBoxCount called with count:', revealedBoxCount);
        //  console.log("Revealed Box Count in App.js:", count);
    };

    const handleGPTButtonClick = () => {
    // Handle the GPTButton click event here
    // You can send a prop or perform any necessary actions
    setIsGPTButtonClicked(true);
    console.log("GPTButton clicked in App.js");
  };

  // Callback function to handle the "Generate Narrative" button click
  const handleNarrativeButtonClick = (isClicked) => {
    // Perform actions based on the button state
    if (isClicked) {
      // The button has been clicked, you can use it for your useEffect block
      setIsNarrativeButtonClicked(true);
      console.log("Generate Narrative button clicked in App.js");
    }
  };

  


  return (
    <div className="App">
      <Header />
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
          showConsoleRight={showConsoleRight} // callback function
          showConsoleLeft={showConsoleLeft} // callback function
          factTexts={factTexts} // pass array of fact box texts as a prop
          onReceiveSelectedFactBoxes={receiveSelectedFactBoxes} // Pass the callback function
          getRevealedBoxCount={getRevealedBoxCount}
          onNarrativeButtonClick={handleNarrativeButtonClick} // Pass the callback function
        />
        {isConsoleRightVisible && <ConsoleRight 
        selectedFactBoxes={selectedFactBoxes} 
        onGPTButtonClick={handleGPTButtonClick} // Pass the callback function
        />}
      </div>
    </div>
  );
}

export default App;
