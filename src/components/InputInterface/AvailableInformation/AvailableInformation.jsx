// AvailableInformation.jsx

import React from 'react';
import FactBox from './FactBox';
import './AvailableInformation.css';

function AvailableInformation({ factCount }) {
  const factBoxes = [];

  for (let i = 0; i < factCount; i++) {
    factBoxes.push(<FactBox key={i} />);
  }

  return (
    <div className="available-information">
      {/* This div will hold the generated FactBox components */}
      {factBoxes.length > 0 && (
        <div className="fact-box-container">{factBoxes}</div>
      )}
    </div>
  );
}

export default AvailableInformation;
