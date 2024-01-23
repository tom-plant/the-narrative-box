// AutoSelectedFactBox.jsx

import React from 'react';
import './AutoSelectedFactBox.css';

function AutoSelectedFactBox({ text }) {
  return (
    <div className="fact-box">
      <p className="fact-text">{text}</p> {/* Use the 'text' prop for displaying fact text */}
    </div>
  );
}

export default AutoSelectedFactBox;
