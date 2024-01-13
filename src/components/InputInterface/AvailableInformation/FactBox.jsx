//FactBox.jsx 

import React from 'react';
import './FactBox.css';

function FactBox({ clicked }) {
  const boxClass = clicked ? 'fact-box clicked' : 'fact-box';
  const textClass = clicked ? 'fact-text clicked-text' : 'fact-text';

  return (
    <div className={boxClass}>
      <p className={textClass}>This is a sample fact.</p>
    </div>
  );
}

export default FactBox;
