import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

import './App.css';

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <div className="App">
      <FormatProvider>
        <SnackbarOpenProvider>
          <LevelProvider>
            <Palette palette={generatePalette(seedColors[4])} />
          </LevelProvider>
        </SnackbarOpenProvider>
      </FormatProvider>
    </div>
  );
}

export default App;
