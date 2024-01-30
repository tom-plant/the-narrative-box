import React, { useState, useEffect, useRef } from 'react';
import FactBox from './FactBox';
import './AvailableInformation.css';

function AvailableInformation({ isInfoButtonClicked, isNarrativeButtonClicked, factTexts, onRemainingFactCount, onUpdateSelectedBoxCount, onGenerateNarrative, onSelectedFactBoxesChange }) {
  const [factBoxes, setFactBoxes] = useState([]); // State to store generated fact boxes
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click
  const [selectedBoxes, setSelectedBoxes] = useState([]); // State to store the index of selected fact boxes
  const [unselectedFactBoxes, setUnselectedFactBoxes] = useState([]); // State to store unselected fact boxes
  const [selectedFactBoxes, setSelectedFactBoxes] = useState([]); // State to store the selected fact boxes including their text and indices
  const prevSelectedFactBoxesRef = useRef(selectedFactBoxes);


  useEffect(() => {
    // Initialize unselectedFactBoxes with all fact boxes
    const initialUnselectedFactBoxes = factTexts.map((factText, index) => ({
      index,
      text: factText,
    }));
    setUnselectedFactBoxes(initialUnselectedFactBoxes);
  }, [factTexts]);

  // Function to generate fact boxes based on the data source
  const generateFactBoxes = () => {
    // Check if the "Generate Information" button is clicked and there are more facts to generate
    if (isInfoButtonClicked && factBoxes.length < factTexts.length) {
      // Create FactBox components from the fact texts in order
      const numToGenerate = Math.min(6, factTexts.length - factBoxes.length); // Calculate numToGenerate based on remaining facts
      const generatedFactBoxes = factTexts
        .slice(factBoxes.length, factBoxes.length + numToGenerate)
        .map((factText, index) => ({
          index: factBoxes.length + index, // Store the index
          text: factText, // Store the text
        }));
  
      // Append the newly generated fact boxes to the existing ones
      setFactBoxes((prevFactBoxes) => [...prevFactBoxes, ...generatedFactBoxes]);
  
      // Calculate remainingFactCount after appending
      const remainingFactCount = factTexts.length - factBoxes.length - numToGenerate;
      // Pass to parent component
      onRemainingFactCount(remainingFactCount);
    }
  };

  // Handle generating fact boxes when the InfoButton is clicked
  useEffect(() => {
    if (isInfoButtonClicked) {
      setIsButtonClicked(true); // Set the button click state to true when clicked
    }
    generateFactBoxes();
  }, [isInfoButtonClicked]);

  // Handle Generate Narrative Button Click
  useEffect(() => {
    if (isNarrativeButtonClicked) {
      // Calculate unselectedFactBoxes based on selectedBoxes
      const updatedUnselectedFactBoxes = factTexts
        .map((factText, index) => ({
          index,
          text: factText,
        }))
        .filter((box) => !selectedBoxes.includes(box.index));

      // Use a functional update to avoid the infinite loop
      setUnselectedFactBoxes((prevUnselectedFactBoxes) => updatedUnselectedFactBoxes);

      // Call the callback function to transfer selected fact boxes
      onGenerateNarrative(selectedFactBoxes, updatedUnselectedFactBoxes);
    }
  }, [isNarrativeButtonClicked, onGenerateNarrative, selectedFactBoxes, factTexts, selectedBoxes]);


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
        } else {
          // Box is selected, remove it from the selectedBoxes array
          setSelectedBoxes((prevSelectedBoxes) =>
            prevSelectedBoxes.filter((item) => item !== index)
          );
          // Remove the deselected fact box from the selectedFactBoxes state
          setSelectedFactBoxes((prevSelectedFactBoxes) =>
            prevSelectedFactBoxes.filter((item) => item.index !== index)
          );
        }

        // Update the selected box count in the parent component
        onUpdateSelectedBoxCount(selectedBoxes.length + (selectedBoxIndex === -1 ? 1 : -1));
      }
    }
  };

  // Calculate the current number of selected boxes
  const selectedBoxCount = selectedBoxes.length;

  // Watch for changes in selectedFactBoxes and invoke the callback function
  useEffect(() => {
    // Compare the current selectedFactBoxes with the previous state
    if (prevSelectedFactBoxesRef.current !== selectedFactBoxes) {
      onSelectedFactBoxesChange(selectedFactBoxes);

      // Update the ref to the current selectedFactBoxes
      prevSelectedFactBoxesRef.current = selectedFactBoxes;
    }
  }, [selectedFactBoxes, onSelectedFactBoxesChange]);

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

      {/* You can now use the unselectedFactBoxes state for your requirements */}
    </div>
  );
}

export default AvailableInformation;
