import React, { createContext, useState } from 'react';

export const SnackbarOpenContext = createContext();

export function SnackbarOpenProvider(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const changeSnackbarOpen = () => setSnackbarOpen(!snackbarOpen);

  return (
    <SnackbarOpenContext.Provider value={{snackbarOpen, changeSnackbarOpen}}>
      {props.children}
    </SnackbarOpenContext.Provider>
  )
}