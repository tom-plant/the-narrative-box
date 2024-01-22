// SelectedFactBox.jsx

import React from 'react';
import './SelectedFactBox.css';

function SelectedFactBox({ text }) {
  return (
    <div className="fact-box">
      <p className="fact-text">{text}</p> {/* Use the 'text' prop for displaying fact text */}
    </div>
  );
}

export default SelectedFactBox;
