// ConsoleRight/SelectedInformation.jsx

import React from 'react';
import './SelectedInformation.css'; // Style as needed

function SelectedInformation({ selectedFactBoxes }) {
  return (
    <div className="selected-information">
      <h3>Selected Information</h3>
      <ul>
        {selectedFactBoxes.map((factBox, index) => (
          <li key={index}>{factBox.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedInformation;
