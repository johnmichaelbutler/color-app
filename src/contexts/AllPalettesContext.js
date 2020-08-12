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

  const addToAllPalettes = async (palettes, newPalette) => {
    setAllPalettes([...palettes, newPalette]);
  }

  return (
    <AllPalettesContext.Provider value={{allPalettes, addToAllPalettes}}>
      {props.children}
    </AllPalettesContext.Provider>
  )
}