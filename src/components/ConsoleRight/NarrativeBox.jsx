// NarrativeBox.jsx

import React from 'react';
import './NarrativeBox.css';

function NarrativeBox() {
  const sampleText = "This is a sample narrative text from the backend.";

  return (
    <div className="narrative-box">
      {/* You can add content here when text is received from the backend */}
      {sampleText}
    </div>
  );
}

export default NarrativeBox;