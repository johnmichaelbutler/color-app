import React, {createContext, useState} from 'react';

export const FormatContext = createContext();

export function FormatProvider(props) {
  const [format, setFormat] = useState('hex');

  const changeFormat = e => setFormat(e.target.value);
  // TESTING
  console.log("FormatContext rendering");
  return (
    <FormatContext.Provider value={{changeFormat, format}}>
      {props.children}
    </FormatContext.Provider>
  )
}