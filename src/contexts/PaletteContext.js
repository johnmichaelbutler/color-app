import React, { useState, createContext } from 'react';
import { generatePalette } from '../colorHelpers';
import seedColors from '../seedColors';

export const PaletteContext = createContext();

const makePalette = id => {
  const seedPalette = seedColors.find((palette) => palette.id === id);
  return generatePalette(seedPalette);
};


export function PaletteProvider(props) {
  const [palette, setPalette] = useState(makePalette("material-ui-colors"));

  const changePalette = id => setPalette(makePalette(id));

  return (
    <PaletteContext.Provider value={{ palette, changePalette }}>
      {props.children}
    </PaletteContext.Provider>
  )
}