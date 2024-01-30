import React from 'react';
import ResetButton from './ResetButton'; // Import the ResetButton component
import './Header.css';

function Header({ isGPTButtonClicked }) {
  return (
    <header className="header">
      <h1 className="header-title">The Narrative Box</h1>
      {isGPTButtonClicked && <ResetButton />} {/* Conditionally render ResetButton */}
    </header>
  );
}

export default Header;
