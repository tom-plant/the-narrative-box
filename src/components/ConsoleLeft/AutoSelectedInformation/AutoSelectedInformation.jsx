// AutoSelectedInformation.jsx

import React from 'react';
import './AutoSelectedInformation.css'; // Style as needed
import AutoSelectedFactBox from './AutoSelectedFactBox'; // Import the AutoSelectedFactBox component

function AutoSelectedInformation({ unselectedFactBoxes }) {
  return (
    <div className="unselected-information">
        <h3 className="info-title">COUNTERNARRATIVE</h3>
       <div className="fact-boxes">
        {unselectedFactBoxes.map((factBox, index) => (
          <AutoSelectedFactBox key={index} text={factBox.text} />
        ))}
      </div>
    </div>
  );
}

export default AutoSelectedInformation;
