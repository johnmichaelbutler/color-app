import React, { useState, createContext } from 'react';
import { generatePalette } from '../colorHelpers';
import seedColors from '../seedColors';

export const PaletteContext = createContext();

const makePalette = id => {
  const seedPalette = seedColors.find((palette) => palette.id === id);
  return generatePalette(seedPalette);
};

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


export function PaletteProvider(props) {
  const [palette, setPalette] = useState(makePalette("material-ui-colors"));

  const changePalette = id => setPalette(makePalette(id));

  return (
    <PaletteContext.Provider value={{ palette, changePalette, gatherShades }}>
      {props.children}
    </PaletteContext.Provider>
  )
}