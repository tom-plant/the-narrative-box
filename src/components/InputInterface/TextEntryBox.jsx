import React from 'react';
import './TextEntryBox.css'; 

function TextEntryBox() {
  return (
    <div className="text-entry-box">
      <textarea
        rows={3} /* Set the number of rows to 3 */
        placeholder="Enter event description…"
        className="text-input"
      ></textarea>
    </div>
  );
}

export default TextEntryBox;
