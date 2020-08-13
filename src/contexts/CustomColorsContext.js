import React, { useState, createContext } from 'react';
import seedColors from '../seedColors';

export const CustomColorsContext = createContext();

export function CustomColorsProvider(props) {
  const [customColors, setCustomColors] = useState(seedColors[0].colors);

  return (
    <CustomColorsContext.Provider value={{customColors, setCustomColors}}>
      {props.children}
    </CustomColorsContext.Provider>
  )
}