import React from 'react';
import FactBox from './FactBox'; // Assuming you have a "FactBox" component
import './AvailableInformation.css'; // Import the CSS file


function AvailableInformation() {
  return (
    <div className="available-information">
      {/* This div will hold the FactBox components */}
      <div className="fact-box-container">
        {/* You can dynamically render FactBox components here */}
        <FactBox />
        {/* Add more FactBox components as needed */}
      </div>
    </div>
  );
}

export default AvailableInformation;
