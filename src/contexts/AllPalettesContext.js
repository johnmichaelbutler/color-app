/*
This context is used to manage all palettes, including custom palettes
*/

import React, { useState, useEffect, createContext } from 'react';
import seedColors from '../seedColors';

export const AllPalettesContext = createContext();

export function AllPalettesProvider(props) {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const [allPalettes, setAllPalettes] = useState(savedPalettes || seedColors);

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(allPalettes));
  }, [allPalettes])

  const addToAllPalettes = (palettes, newPalette) => {
    setAllPalettes([...palettes, newPalette]);
  }

  const deletePalette = id => {
    setAllPalettes(allPalettes.filter(palette => palette.id !== id))
  }

// For testing
  console.log("allPalettes", allPalettes);

  return (
    <AllPalettesContext.Provider value={{allPalettes, addToAllPalettes, deletePalette}}>
      {props.children}
    </AllPalettesContext.Provider>
  )
}