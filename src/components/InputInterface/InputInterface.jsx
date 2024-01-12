// InputInterface.jsx

import React, { useState } from 'react';
import TextEntryBox from './TextEntryBox';
import GenerateButton from './GenerateButton';
import AvailableInformation from './AvailableInformation/AvailableInformation';
import './InputInterface.css';

function InputInterface() {
  const [factCount, setFactCount] = useState(0);

  const handleGenerateClick = () => {
    // Check if factCount is less than 30 before incrementing
    if (factCount < 30) {
      const newFactCount = factCount + 6;
      // Cap the count at 36 if it exceeds
      setFactCount(newFactCount > 30 ? 30 : newFactCount);
    }
  };

  return (
    <div className="input-interface">
      <TextEntryBox />
      <GenerateButton onGenerateClick={handleGenerateClick} />
      <AvailableInformation factCount={factCount} />
    </div>
  );
}

export default InputInterface;
