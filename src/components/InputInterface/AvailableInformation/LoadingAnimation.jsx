// LoadingAnimation.jsx

import React from 'react';
import './LoadingAnimation.css'; // Ensure the path is correct

const LoadingAnimation = () => (
  <div className="loading-grid">
    <div className="box"></div> {/* 1: Top Left */}
    <div className="box"></div> {/* 2: Top Center */}
    <div className="box"></div> {/* 3: Top Right */}
    <div className="box"></div> {/* 4: Middle Left */}
    <div className="empty-box"></div> {/* Center always empty */}
    <div className="box"></div> {/* 5: Middle Right */}
    <div className="box"></div> {/* 6: Bottom Left */}
    <div className="box"></div> {/* 7: Bottom Center */}
    <div className="box"></div> {/* 8: Bottom Right */}
  </div>
);

export default LoadingAnimation;
