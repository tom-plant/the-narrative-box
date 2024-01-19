// SelectedBoxesContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedBoxesContext = createContext();

export function useSelectedBoxes() {
  return useContext(SelectedBoxesContext);
}

export function SelectedBoxesProvider({ children }) {
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const addSelectedBox = (index) => {
    setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, index]);
  };

  const removeSelectedBox = (index) => {
    setSelectedBoxes((prevSelectedBoxes) =>
      prevSelectedBoxes.filter((item) => item !== index)
    );
  };

  return (
    <SelectedBoxesContext.Provider
      value={{ selectedBoxes, addSelectedBox, removeSelectedBox }}
    >
      {children}
    </SelectedBoxesContext.Provider>
  );
}
