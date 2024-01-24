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


  // Console Visibility
  const showConsoleRight = () => {
    console.log('showConsoleRight called');
    setConsoleRightVisible(true);
  };
  const showConsoleLeft = () => {
    console.log('showConsoleLeft called');
    setConsoleLeftVisible(true);
  };

  // Selected and Unselected Box Data
  const receiveSelectedFactBoxes = (selectedFactBoxes, unselectedFactBoxes) => {
    console.log('receiveSelectedFactBoxes called');
    setSelectedFactBoxes(selectedFactBoxes);
    setUnSelectedFactBoxes(unselectedFactBoxes);

      // Check if unselectedFactBoxes is an array
      if (Array.isArray(unselectedFactBoxes)) {
        setUnSelectedFactBoxes(unselectedFactBoxes);
      } else {
        console.error("unselectedFactBoxes is not an array!");
        // You can handle this case as needed, such as setting it to an empty array
        setUnSelectedFactBoxes([]);
      }

//     console.log("Received selected fact boxes in App.js:", selectedFactBoxes, "and unselected fact boxes in App.js", unselectedFactBoxes); // Add this console log
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
          />}
        <InputInterface
          showConsoleRight={showConsoleRight} // callback function
          showConsoleLeft={showConsoleLeft} // callback function
          factTexts={factTexts} // pass array of fact box texts as a prop
          onReceiveSelectedFactBoxes={receiveSelectedFactBoxes} // Pass the callback function
          getRevealedBoxCount={getRevealedBoxCount}
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
