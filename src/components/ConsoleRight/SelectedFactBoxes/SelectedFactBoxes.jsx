// ConsoleRight/SelectedFactBoxes.jsx

import React from 'react';
import './SelectedFactBoxes.css'; // Style as needed

function SelectedFactBoxes({ selectedFactBoxes }) {
  return (
    <div className="selected-fact-boxes">
      {/* Render the selected fact boxes here */}
      {selectedFactBoxes.map((factBox, index) => (
        <div key={index} className="selected-fact-box">
          {factBox}
        </div>
      ))}
    </div>
  );
}

export default SelectedFactBoxes;
