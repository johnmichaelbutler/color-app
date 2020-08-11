/*
This SinglePaletteContext is used to make a single palette or shades of a single color within a palette.
AllPalettesContext is used to manage all palettes, including custom palettes
*/
import React, { useState, createContext, useContext } from 'react';
import { generatePalette } from '../colorHelpers';
import { AllPalettesContext } from './AllPalettesContext';

export const SinglePaletteContext = createContext();

// Makes the various shades for a single color within a palette
export const gatherShades = (palette, colorToFilterBy) => {
  let shades = [];
  let allColors = palette.colors;
  for(let key in allColors) {
    shades = shades.concat(
      allColors[key].filter(color => color.id === colorToFilterBy)
    )
  }
  return shades.slice(1);
}


export function SinglePaletteProvider(props) {
  const { allPalettes } = useContext(AllPalettesContext);

  // Creates all the different color levels for all colors in a palette
  const makeSinglePalette = id => {
    const seedPalette = allPalettes.find((palette) => palette.id === id);
    return generatePalette(seedPalette);
  };

  const [palette, setPalette] = useState(makeSinglePalette("material-ui-colors"));

  const changePalette = id => setPalette(makeSinglePalette(id));

  return (
    <SinglePaletteContext.Provider value={{ palette, changePalette, gatherShades }}>
      {props.children}
    </SinglePaletteContext.Provider>
  )
}