// ConsoleRight/SelectedFactBoxes.jsx

import React from 'react';
import { useSelectedBoxes } from './SelectedBoxesContext'; // Import the hook
import './SelectedFactBoxes.css'; // Style as needed

function SelectedFactBoxes() {
  const { selectedFactBoxes } = useSelectedBoxes(); // Access selected fact boxes from the context

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
