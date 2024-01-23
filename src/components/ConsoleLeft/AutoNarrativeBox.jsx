// AutoNarrativeBox.jsx

import React from 'react';
import './AutoNarrativeBox.css';

function AutoNarrativeBox() {
  const sampleText = "This is a sample auto narrative text from the backend. For timing purposes, the narrative will have already started generating upon pushing 'Next', but this is to give the illusion that the app is faster than in reality.";

  return (
    <div className="auto-narrative-box">
      {/* You can add content here when text is received from the backend */}
      {sampleText}
    </div>
  );
}

export default AutoNarrativeBox;