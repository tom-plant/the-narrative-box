// NarrativeBox.jsx

import React from 'react';
import './NarrativeBox.css';

function NarrativeBox({ narrative1 }) {
  // const sampleText = "This is a sample narrative text from the backend. For timing purposes, the narrative will have already started generating upon pushing 'Next', but this is to give the illusion that the app is faster than in reality.";

  return (
    <div className="narrative-box">
      {/* You can add content here when text is received from the backend */}
      {narrative1}
    </div>
  );
}

export default NarrativeBox;