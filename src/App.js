import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { SinglePaletteProvider } from './contexts/SinglePaletteContext';
import { AllPalettesProvider } from './contexts/AllPalettesContext';
import { CustomColorsProvider }from './contexts/CustomColorsContext';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <AllPalettesProvider>
        <CustomColorsProvider>
          <SinglePaletteProvider>
            <FormatProvider>
              <Routes />
            </FormatProvider>
          </SinglePaletteProvider>
        </CustomColorsProvider>
      </AllPalettesProvider>
    </div>
  );
}

export default App;