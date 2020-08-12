import React, { useState, createContext } from 'react';

export const CurrentColorContext = createContext();

export function CurrentColorProvider(props) {
  const [currentColor, setCurrentColor] = useState("teal");

  return (
    <CurrentColorContext.Provider value={{currentColor, setCurrentColor}}>
      {props.children}
    </CurrentColorContext.Provider>
  )
}