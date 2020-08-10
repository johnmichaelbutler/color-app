import React, { useState, createContext } from 'react';

export const LevelContext = createContext();

export function LevelProvider(props) {
  const [level, setLevel] = useState(500);

  const changeLevel = newLevel => setLevel(newLevel);

  return (
    <LevelContext.Provider value={{level, changeLevel}}>
      {props.children}
    </LevelContext.Provider>
  )
};
