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

  // Console Visibility
  const showConsoleRight = () => {
    setConsoleRightVisible(true);
  };
  const showConsoleLeft = () => {
    setConsoleLeftVisible(true);
  };

  const receiveSelectedFactBoxes = (factBoxes) => {
    setSelectedFactBoxes(factBoxes);
    console.log("Received selected fact boxes in App.js:", factBoxes); // Add this console log
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        {isConsoleLeftVisible && <ConsoleLeft />}
        <InputInterface
          showConsoleRight={showConsoleRight} // callback function
          showConsoleLeft={showConsoleLeft} // callback function
          factTexts={factTexts} // pass array of fact box texts as a prop
          onReceiveSelectedFactBoxes={receiveSelectedFactBoxes} // Pass the callback function
        />
        {isConsoleRightVisible && <ConsoleRight selectedFactBoxes={selectedFactBoxes} />}
      </div>
    </div>
  );
}

export default App;
