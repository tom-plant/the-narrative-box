// App.js

import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';
import ConsoleRight from './components/ConsoleRight/ConsoleRight';
import ConsoleLeft from './components/ConsoleLeft/ConsoleLeft';

function App() {
  const [isConsoleRightVisible, setConsoleRightVisible] = useState(false);
  const [isConsoleLeftVisible, setConsoleLeftVisible] = useState(false);

  //Console Visibility
  const showConsoleRight = () => {
    setConsoleRightVisible(true);
  };
  const showConsoleLeft = () => {
    setConsoleLeftVisible(true);
  };

  
  return (
    <div className="App">
      <Header />
      <div className="container">
      {isConsoleLeftVisible && <ConsoleLeft />}
        <InputInterface 
          showConsoleRight={showConsoleRight} // callback function
          showConsoleLeft={showConsoleLeft} // callback function
          />
        {isConsoleRightVisible && <ConsoleRight />}
      </div>
    </div>
  );
}

export default App;
