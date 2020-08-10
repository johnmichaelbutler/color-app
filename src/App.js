import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import { PaletteProvider } from './contexts/PaletteContext';
import Palette from './Palette';

import './App.css';

function App() {

  return (
    <div className="App">
      <FormatProvider>
        <SnackbarOpenProvider>
          <LevelProvider>
            <PaletteProvider>
              <Palette />
            </PaletteProvider>
          </LevelProvider>
        </SnackbarOpenProvider>
      </FormatProvider>
    </div>
  );
}

export default App;
