import React from 'react';
import TextEntryBox from './TextEntryBox';
import GenerateButton from './GenerateButton';
import AvailableInformation from './AvailableInformation/AvailableInformation'; 
import './InputInterface.css';


function InputInterface() {
  return (
    <div className="input-interface">
      <TextEntryBox />
      <GenerateButton />
      <AvailableInformation />
    </div>
  );
}

export default InputInterface;
