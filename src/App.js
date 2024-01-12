import React from 'react';
import './App.css'; // You may need to create a CSS file for styling

import Header from './components/Header';
import InputInterface from './components/InputInterface/InputInterface';

function App() {
  return (
    <div className="App">
      <Header />
      <InputInterface />
    </div>
  );
}

export default App;
