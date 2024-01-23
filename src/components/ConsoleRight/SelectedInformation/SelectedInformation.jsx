// ConsoleRight/SelectedInformation.jsx

import React from 'react';
import './SelectedInformation.css'; // Style as needed
import SelectedFactBox from './SelectedFactBox'; // Import the SelectedFactBox component

function SelectedInformation({ selectedFactBoxes }) {
  return (
    <div className="selected-information">
        <h3 className="info-title">YOUR NARRATIVE</h3>
       <div className="fact-boxes">
        {selectedFactBoxes.map((factBox, index) => (
          <SelectedFactBox key={index} text={factBox.text} />
        ))}
      </div>
    </div>
  );
}

export default SelectedInformation;
