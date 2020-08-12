import React, {createContext, useState} from 'react';

export const DrawerOpenContext = createContext();

export function DrawerOpenProvider(props) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <DrawerOpenContext.Provider value={{drawerOpen, setDrawerOpen}}>
      {props.children}
    </DrawerOpenContext.Provider>
  )
}