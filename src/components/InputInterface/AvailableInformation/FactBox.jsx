// FactBox.jsx

import React from 'react';
import './FactBox.css';

function FactBox({ clicked, text }) {
  const boxClass = clicked ? 'fact-box clicked' : 'fact-box';
  const textClass = clicked ? 'fact-text clicked-text' : 'fact-text';

  return (
    <div className={boxClass}>
      <p className={textClass}>{text}</p> {/* Use the 'text' prop for displaying fact text */}
    </div>
  );
}

export default FactBox;
