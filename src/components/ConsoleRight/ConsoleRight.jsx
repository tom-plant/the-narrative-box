// ConsoleRight.jsx

import React from 'react';
import './ConsoleRight.css';
import SelectedInformation from './SelectedInformation/SelectedInformation'; // Import the child component

function ConsoleRight({ selectedFactBoxes }) { // Pass selectedFactBoxes as a prop
  return (
    <div className="console-right">
      {/* You can include the child component here */}
      <SelectedInformation selectedFactBoxes={selectedFactBoxes} />
    </div>
  );
}

export default ConsoleRight;
