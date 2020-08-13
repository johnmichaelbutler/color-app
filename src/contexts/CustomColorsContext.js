import React, { useState, useContext, createContext } from 'react';
import {AllPalettesContext} from './AllPalettesContext';

export const CustomColorsContext = createContext();

export function CustomColorsProvider(props) {
  const {allPalettes} = useContext(AllPalettesContext);
  const [customColors, setCustomColors] = useState(allPalettes[0].colors);


  // For Testing
  console.log("customColors", customColors);
  return (
    <CustomColorsContext.Provider value={{customColors, setCustomColors}}>
      {props.children}
    </CustomColorsContext.Provider>
  )
}