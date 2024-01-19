//AvailableInformation.jsx

import React, { useState, useEffect } from 'react';
import FactBox from './FactBox';
import './AvailableInformation.css';

function AvailableInformation({ isInfoButtonClicked, isNarrativeButtonClicked, onBoxSelectionChange, factTexts, onRemainingFactCount, onUpdateSelectedBoxCount, onGenerateNarrative }) {
  const [factBoxes, setFactBoxes] = useState([]); // State to store generated fact boxes
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click
  const [selectedBoxes, setSelectedBoxes] = useState([]); // State to store the index of selected fact boxes
  const [selectedFactBoxes, setSelectedFactBoxes] = useState([]); // State to store the selected fact boxes including their text and indices


  // Function to generate fact boxes based on the data source
  const generateFactBoxes = () => {
    // Check if the "Generate Information" button is clicked and there are more facts to generate
    if (isInfoButtonClicked && factBoxes.length < factTexts.length) {
      const remainingFactCount = factTexts.length - factBoxes.length;
      // Pass to parent component
      onRemainingFactCount(remainingFactCount);
      const numToGenerate = Math.min(6, remainingFactCount); // Generate up to 6 at a time

      // Create FactBox components from the fact texts in order
      const generatedFactBoxes = factTexts
        .slice(factBoxes.length, factBoxes.length + numToGenerate)
        .map((factText, index) => ({
          index: factBoxes.length + index, // Store the index
          text: factText, // Store the text
        }));

      // Append the newly generated fact boxes to the existing ones
      setFactBoxes((prevFactBoxes) => [...prevFactBoxes, ...generatedFactBoxes]);
    }
  };

  // Handle generating fact boxes when the button is clicked
  useEffect(() => {
    if (isInfoButtonClicked) {
      setIsButtonClicked(true); // Set the button click state to true when clicked
    }
    generateFactBoxes();
  }, [isInfoButtonClicked]);

  // Handle Generate Narrative Button Click
  useEffect(() => {
    if (isNarrativeButtonClicked) {
      console.log("Generate Narrative button clicked and signal sent to AvailableInformation!");
      // Call the callback function to transfer selected fact boxes
      onGenerateNarrative(selectedFactBoxes);
    }
  }, [isNarrativeButtonClicked, onGenerateNarrative, selectedFactBoxes]);

  // Function to handle fact box click and toggle selection
  const handleBoxClick = (index) => {
    if (isButtonClicked) {
      if (selectedBoxes.length < 5 || selectedBoxes.includes(index)) {
        const selectedBoxIndex = selectedBoxes.indexOf(index);
        if (selectedBoxIndex === -1) {
          // Box is not selected, add it to the selectedBoxes array
          setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, index]);
          // Add the selected fact box (including text and index) to the selectedFactBoxes state
          setSelectedFactBoxes((prevSelectedFactBoxes) => [...prevSelectedFactBoxes, {
            index,
            text: factTexts[index],
          }]);
  //        console.log(`Fact box ${index} selected.`);
  //        console.log("Selected Fact Boxes:", selectedFactBoxes);
        } else {
          // Box is selected, remove it from the selectedBoxes array
          setSelectedBoxes((prevSelectedBoxes) =>
            prevSelectedBoxes.filter((item) => item !== index)
          );
          // Remove the deselected fact box from the selectedFactBoxes state
          setSelectedFactBoxes((prevSelectedFactBoxes) =>
            prevSelectedFactBoxes.filter((item) => item.index !== index)
          );
 //         console.log(`Fact box ${index} deselected.`);
  //        console.log("Selected Fact Boxes:", selectedFactBoxes);
        }

        // Update the selected box count in the parent component
        onUpdateSelectedBoxCount(selectedBoxes.length + (selectedBoxIndex === -1 ? 1 : -1));
      }
    }
  };

  // Calculate the current number of selected boxes
  const selectedBoxCount = selectedBoxes.length;

  return (
    <div className="available-information">
      {isButtonClicked && (
        <div className="select-text">Select up to five pieces of information</div>
      )}

      {/* Display the counter */}
      {isButtonClicked && (
        <div className="counter">{`${selectedBoxCount}/5`}</div>
      )}

      {/* Display the generated fact boxes */}
      {factBoxes.map((factBox, index) => (
        <div
          key={index}
          className={`fact-box${selectedBoxes.includes(index) ? ' selected' : ''}`}
          onClick={() => handleBoxClick(index)}
        >
          <FactBox text={factTexts[index]} /> {/* Pass the text to FactBox */}
        </div>
      ))}
    </div>
  );
}

export default AvailableInformation;