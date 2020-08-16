import React, { createContext, useReducer } from 'react';
import CustomColorsReducer from '../reducers/CustomColorsReducer';
import seedColors from '../seedColors';

export const CustomColorsContext = createContext();
export const ColorDispatchContext = createContext()

export function CustomColorsProvider(props) {
  const [customColors, colorsDispatch] = useReducer(CustomColorsReducer, seedColors[0].colors);

    // TESTING
    console.log("CustomColorsContext rendering");
  return (
    <CustomColorsContext.Provider value={customColors}>
      <ColorDispatchContext.Provider value={colorsDispatch}>
        {props.children}
      </ColorDispatchContext.Provider>
    </CustomColorsContext.Provider>
  )
}