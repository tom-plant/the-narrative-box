// ConsoleLeft.jsx

import React, { useState, useEffect } from 'react';
import './ConsoleLeft.css';
import AutoSelectedInformation from './AutoSelectedInformation/AutoSelectedInformation';
import AutoNarrativeBox from './AutoNarrativeBox';

function ConsoleLeft({ selectedFactBoxes, unselectedFactBoxes, revealedBoxCount, factTexts, isGPTButtonClicked }) {
  const numberOfSelectedBoxes = selectedFactBoxes.length;   // Calculate the number of selected boxes
  const numberOfRevealedBoxes = revealedBoxCount;  // Calculate the number of revealed boxes
  const numberOfRevealedUnselected = numberOfRevealedBoxes - numberOfSelectedBoxes; // Calculate the number of revealed and unselected boxes
  const [showAutoNarrative, setShowAutoNarrative] = useState(false); // State to control the visibility of AutoNarrativeBox


  let finalFactBoxes = [];

  console.log('numberOfSelectedBoxes:', numberOfSelectedBoxes);
  console.log('numberOfRevealedBoxes:', numberOfRevealedBoxes);
  console.log('numberOfRevealedUnselected:', numberOfRevealedUnselected);

  if (numberOfRevealedUnselected === numberOfSelectedBoxes) {
    // Case a: Number of revealed and unselected boxes equals the number of selected boxes
    finalFactBoxes = unselectedFactBoxes.slice(0, numberOfSelectedBoxes);
  } else if (numberOfRevealedUnselected < numberOfSelectedBoxes) {
    // Case b: Number of revealed and unselected boxes is less than the number of selected boxes
    const unrevealedBoxesNeeded = numberOfSelectedBoxes - numberOfRevealedUnselected;
    const frontSlice = unselectedFactBoxes.slice(0, unrevealedBoxesNeeded);
    const backSlice = unselectedFactBoxes.slice(
      unselectedFactBoxes.length - (unrevealedBoxesNeeded - 1),
      unselectedFactBoxes.length
    );

    console.log('frontSlice:', frontSlice);
    console.log('backSlice:', backSlice);

    // Randomly select boxes from the backSlice and add to frontSlice
    const randomIndexes = [];
    while (randomIndexes.length < unrevealedBoxesNeeded) {
      const randomIndex = Math.floor(Math.random() * backSlice.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
        frontSlice.push(backSlice[randomIndex]);
      }
    }

    finalFactBoxes = frontSlice;
  } else {
    // Case c: Number of revealed and unselected boxes is greater than the number of selected boxes
    const revealedFactBoxes = factTexts.slice(0, numberOfRevealedBoxes);
    const differentBoxes = revealedFactBoxes.filter(
      (factBox) => !selectedFactBoxes.some((selectedBox) => selectedBox.text === factBox)
    );

    // console.log('revealedFactBoxes:', revealedFactBoxes);
    // console.log('differentBoxes:', differentBoxes);

    // Randomly select boxes equal to the number of selected boxes
    const randomIndexes = [];
    while (randomIndexes.length < numberOfSelectedBoxes) {
      const randomIndex = Math.floor(Math.random() * differentBoxes.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
        finalFactBoxes.push({ text: differentBoxes[randomIndex] });
      }
    }
  }

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
