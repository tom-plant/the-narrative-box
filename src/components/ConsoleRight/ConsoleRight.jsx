// ConsoleRight.jsx

import React, { useState } from 'react';
import './ConsoleRight.css';
import SelectedInformation from './SelectedInformation/SelectedInformation'; 
import GPTButton from './GPTButton'; 
import NarrativeBox from './NarrativeBox'; 


function ConsoleRight({ selectedFactBoxes }) { // Pass selectedFactBoxes as a prop
  const [showNarrative, setShowNarrative] = useState(false); // State to control the visibility of NarrativeBox

  const handleGPTButton = () => {
    // Trigger backend actions here
    // You can send a signal or make API requests to the backend
    // Example: Send a signal to the backend
    console.log("Generate Narrative button clicked! Sending signal to the backend...");

  // Set the state to reveal the NarrativeBox component
  setShowNarrative(true);
  };

  return (
    <div className="console-right">
      {/* You can include the child component here */}
      <SelectedInformation selectedFactBoxes={selectedFactBoxes} />
      <GPTButton onClick={handleGPTButton} />

       {/* Conditionally render NarrativeBox */}
       {showNarrative && <NarrativeBox />}
    </div>
  );
}

export default ConsoleRight;
