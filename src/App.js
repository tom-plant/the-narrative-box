// App.js

import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';
import ConsoleRight from './components/ConsoleRight/ConsoleRight';
import ConsoleLeft from './components/ConsoleLeft/ConsoleLeft';

function App() {
  const [isConsoleRightVisible, setConsoleRightVisible] = useState(false);

  const showConsoleRight = () => {
    setConsoleRightVisible(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <ConsoleLeft />
        <InputInterface showConsoleRight={showConsoleRight} />
        {isConsoleRightVisible && <ConsoleRight />}
      </div>
    </div>
  );
}

export default App;
