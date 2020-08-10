import React, { useState, createContext } from 'react';
import { generatePalette } from '../colorHelpers';
import seedColors from '../seedColors';

export const PaletteContext = createContext();

const makePalette = num => {
  return generatePalette(seedColors[num]);
}

export function PaletteProvider(props) {
  const [palette, setPalette] = useState(makePalette(4));

  const changePalette = num => setPalette(makePalette(num));

  return (
    <PaletteContext.Provider value={{ palette, changePalette }}>
      {props.children}
    </PaletteContext.Provider>
  )
}