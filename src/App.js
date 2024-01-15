// App.js
import React from 'react';
import './App.css';

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';
import ConsoleRight from './components/ConsoleRight/ConsoleRight';
import ConsoleLeft from './components/ConsoleLeft/ConsoleLeft';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <ConsoleLeft />
        <InputInterface />
        <ConsoleRight />
      </div>
    </div>
  );
}

export default App;
