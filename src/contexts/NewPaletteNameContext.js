import React, { useState, createContext } from 'react';

export const NewPaletteNameContext = createContext();

export function NewPaletteNameProvider(props) {
  const [newPaletteName, setNewPaletteName] = useState("");

  return (
    <NewPaletteNameContext.Provider value={{newPaletteName, setNewPaletteName}}>
      {props.children}
    </NewPaletteNameContext.Provider>
  )
}