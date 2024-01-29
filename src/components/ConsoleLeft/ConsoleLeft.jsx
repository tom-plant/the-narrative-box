// ConsoleLeft.jsx

import React, { useState, useEffect } from 'react';
import './ConsoleLeft.css';
import AutoSelectedInformation from './AutoSelectedInformation/AutoSelectedInformation';
import AutoNarrativeBox from './AutoNarrativeBox';

function ConsoleLeft({ selectedFactBoxes, unselectedFactBoxes, revealedBoxCount, factTexts, isGPTButtonClicked, isConsoleLeftVisible, isNarrativeButtonClicked }) {
  const numberOfSelectedBoxes = selectedFactBoxes.length;   // Calculate the number of selected boxes
  const numberOfRevealedBoxes = revealedBoxCount;  // Calculate the number of revealed boxes
  const numberOfRevealedUnselected = numberOfRevealedBoxes - numberOfSelectedBoxes; // Calculate the number of revealed and unselected boxes
  const [showAutoNarrative, setShowAutoNarrative] = useState(false); // State to control the visibility of AutoNarrativeBox
  const [finalFactBoxes, setFinalFactBoxes] = useState([]); // State for finalFactBoxes


  // console.log('numberOfSelectedBoxes:', numberOfSelectedBoxes);
  // console.log('numberOfRevealedBoxes:', numberOfRevealedBoxes);
  // console.log('numberOfRevealedUnselected:', numberOfRevealedUnselected);
  
  useEffect(() => {
    if (isNarrativeButtonClicked) {
      // console.log('isNarrativeButtonClicked effect triggered');
      if (finalFactBoxes.length === 0) {
          // Initialize finalFactBoxes if it's empty
        if (isConsoleLeftVisible && numberOfRevealedUnselected === numberOfSelectedBoxes) {
          // Case a: Number of revealed and unselected boxes equals the number of selected boxes
          setFinalFactBoxes(unselectedFactBoxes.slice(0, numberOfSelectedBoxes));
        } else if (numberOfRevealedUnselected < numberOfSelectedBoxes) {
          // Case b: Number of revealed and unselected boxes is less than the number of selected boxes
          const unrevealedBoxesNeeded = numberOfSelectedBoxes - numberOfRevealedUnselected;

          // First, select two random boxes from unselectedFactBoxes
          const randomIndexes = [];
          while (randomIndexes.length < 2) {
            const randomIndex = Math.floor(Math.random() * unselectedFactBoxes.length);
            if (!randomIndexes.includes(randomIndex)) {
              randomIndexes.push(randomIndex);
            }
          }

          const randomBoxes = randomIndexes.map((index) => unselectedFactBoxes[index]);

          // Then, select the remaining revealed and unselected boxes
          const remainingBoxes = unselectedFactBoxes.filter((box) =>
            selectedFactBoxes.every((selectedBox) => selectedBox.text !== box.text)
          );

          // Combine randomBoxes and remainingBoxes to get finalFactBoxes
          const finalFactBoxesForCaseB = [...randomBoxes, ...remainingBoxes.slice(0, unrevealedBoxesNeeded)];

          setFinalFactBoxes(finalFactBoxesForCaseB);

        } else {
          // Case c: Number of revealed and unselected boxes is greater than the number of selected boxes
          const revealedFactBoxes = factTexts.slice(0, numberOfRevealedBoxes);
          const differentBoxes = revealedFactBoxes.filter(
            (factBox) => !selectedFactBoxes.some((selectedBox) => selectedBox.text === factBox)
          );

          // Randomly select boxes equal to the number of selected boxes
          const randomIndexes = [];
          while (randomIndexes.length < numberOfSelectedBoxes) {
            const randomIndex = Math.floor(Math.random() * differentBoxes.length);
            if (!randomIndexes.includes(randomIndex)) {
              randomIndexes.push(randomIndex);
            }
          }

          const selectedFactBoxesForCaseC = randomIndexes.map((index) => ({ text: differentBoxes[index] }));
          setFinalFactBoxes(selectedFactBoxesForCaseC);
        }
      }
    }
  }, [isNarrativeButtonClicked, isConsoleLeftVisible, numberOfRevealedUnselected, numberOfSelectedBoxes, unselectedFactBoxes, factTexts, selectedFactBoxes]);

  // console.log("finalfactboxes",finalFactBoxes)


  // Use the isGPTButtonClicked prop to conditionally render AutoNarrativeBox
  useEffect(() => {
    if (isGPTButtonClicked) {
      setShowAutoNarrative(true);
    }
  }, [isGPTButtonClicked]);

  return (
    <div className="console-left">
      <AutoSelectedInformation finalFactBoxes={finalFactBoxes} />
      {showAutoNarrative && <AutoNarrativeBox />}
    </div>
  );
}

export default ConsoleLeft;
