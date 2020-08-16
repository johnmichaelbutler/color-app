/*
This context is used to manage all palettes, including custom palettes
*/
import React, { useEffect, createContext, useReducer } from 'react';
import PalettesReducer from '../reducers/PalettesReducer';
import seedColors from '../seedColors';

export const AllPalettesContext = createContext();
export const PaletteDispatchContext = createContext();


export function AllPalettesProvider(props) {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const [allPalettes, paletteDispatch] = useReducer(PalettesReducer, savedPalettes || seedColors);

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(allPalettes));
  }, [allPalettes])

  // TESTING
  console.log("AllPaletteContext called");
  return (
    <AllPalettesContext.Provider value={allPalettes}>
      <PaletteDispatchContext.Provider value={paletteDispatch}>
        {props.children}
      </PaletteDispatchContext.Provider>
    </AllPalettesContext.Provider>
  )
};
