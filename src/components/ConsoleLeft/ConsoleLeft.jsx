// ConsoleLeft.jsx

import React, { useState, useEffect } from 'react';
import AutoSelectedInformation from './AutoSelectedInformation/AutoSelectedInformation'; 
import './ConsoleLeft.css';
import { shuffleArray } from '../../utils/utils'; // Import the shuffleArray function


function ConsoleLeft({ selectedFactBoxes, unselectedFactBoxes }) {
  const [autoSelectedFactBoxes, setAutoSelectedFactBoxes] = useState([]);

  useEffect(() => {
    // Shuffle the "Unselected Information" array
    const shuffledUnselectedFactBoxes = shuffleArray(unselectedFactBoxes);

    // Slice to select the same number of fact boxes as selected
    const selectedSubset = shuffledUnselectedFactBoxes.slice(0, selectedFactBoxes.length);

    // Set the selected subset in state
    setAutoSelectedFactBoxes(selectedSubset);
  }, [unselectedFactBoxes, selectedFactBoxes]);


  return (
    <div className="console-left">
        <AutoSelectedInformation unselectedFactBoxes={autoSelectedFactBoxes} />
    </div>
  );
}

export default ConsoleLeft;
