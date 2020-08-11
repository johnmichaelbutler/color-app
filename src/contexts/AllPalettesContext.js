/*
This context is used to manage all palettes, including custom palettes
*/

import React, { useState, createContext } from 'react';
import seedColors from '../seedColors';

export const AllPalettesContext = createContext();

export function AllPalettesProvider(props) {
  const [allPalettes, setAllPalettes] = useState(seedColors);

  const addToAllPalettes = (palettes, newPalette) => setAllPalettes([...palettes, newPalette]);

  return (
    <AllPalettesContext.Provider value={{allPalettes, addToAllPalettes}}>
      {props.children}
    </AllPalettesContext.Provider>
  )
}