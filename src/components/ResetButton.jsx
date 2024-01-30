// ResetButton.jsx

import React, { useState, useEffect, useRef } from 'react';
import './ResetButton.css';

function ResetButton() {
  const handleResetClick = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <button className="reset-button" onClick={handleResetClick}>Reset Page</button>
  );
}

export default ResetButton;