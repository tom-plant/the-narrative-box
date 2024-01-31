import React from 'react';
import './TextEntryBox.css';

function TextEntryBox({ setUserInput }) {
  const handleInputChange = (event) => {
    const text = event.target.value;
    setUserInput(text); // Update the userInput state in the parent component
  };

  return (
    <div className="text-entry-box">
      <textarea
        rows={3}
        placeholder="Enter event description…"
        className="text-input"
        onChange={handleInputChange} // Call handleInputChange when the textarea value changes
      ></textarea>
    </div>
  );
}

export default TextEntryBox;
