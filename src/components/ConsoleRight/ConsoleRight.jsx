// ConsoleRight.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios'; 

import './ConsoleRight.css';
import SelectedInformation from './SelectedInformation/SelectedInformation'; 
import GPTButton from './GPTButton'; 
import NarrativeBox from './NarrativeBox'; 


function ConsoleRight({ selectedFactBoxes, onGPTButtonClick, pulsingState, autoSelectedFactBoxes, userInput, onAutoNarrativeReceived }) { // Pass selectedFactBoxes as a prop
  const [showNarrative, setShowNarrative] = useState(false); // State to control the visibility of NarrativeBox
  const [narrative1, setNarrative1] = useState(''); // State for the first narrative
  const [narrative2, setNarrative2] = useState(''); // State for the second narrative
  const prevSelectedFactBoxesRef = useRef([]);


  const handleGPTButton = () => {
    // console.log("Generate Narrative button clicked! Sending signal to the backend...");
  // Check if selectedFactBoxes have changed since the last API call
  if (JSON.stringify(selectedFactBoxes) !== JSON.stringify(prevSelectedFactBoxesRef.current)) {
    console.log('starting the code for backend communcation')
    // Update the reference to the current selectedFactBoxes
    prevSelectedFactBoxesRef.current = selectedFactBoxes;

    // Prepare the data to send to the server
    const requestData = {
      userInput: userInput, // Ensure that userinput is accessible from your server.js
      selectedInformation: selectedFactBoxes,
      autoSelectedInformation: autoSelectedFactBoxes,
    };

    console.log('Request Data:', requestData);

    // Send a POST request to the server
    axios.post('http://localhost:5000/generate-narratives', requestData)
      .then((response) => {
        // Handle the successful response here
        const { narrative1, narrative2 } = response.data;
        // Store the narratives as separate variables on the client side
        setNarrative1(narrative1);
        setNarrative2(narrative2);
        console.log('responses appear to be successful:',narrative1, narrative2)
        onAutoNarrativeReceived(narrative2);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error sending data to the server:', error);
        // You can display an error message to the user if needed
      });
  } else {
    // No need to trigger the API if selectedFactBoxes haven't changed
    // You can inform the user or handle this case as per your requirements
  }



  
  if (onGPTButtonClick) {
    onGPTButtonClick();
  }
  // Set the state to reveal the NarrativeBox component
  setShowNarrative(true)
  };

  return (
    <div className="console-right">
      {/* You can include the child component here */}
      <SelectedInformation selectedFactBoxes={selectedFactBoxes} />
      <GPTButton 
        onClick={handleGPTButton} 
        selectedFactBoxes={selectedFactBoxes}
        pulsingState={pulsingState}
        autoSelectedFactBoxes={autoSelectedFactBoxes}
      />
       {/* Conditionally render NarrativeBox */}
       {showNarrative && <NarrativeBox 
        narrative1={narrative1}
       />}
    </div>
  );
}

export default ConsoleRight;
