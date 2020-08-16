import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { SinglePaletteProvider } from './contexts/SinglePaletteContext';
import { AllPalettesProvider } from './contexts/AllPalettesContext';
import { CustomColorsProvider }from './contexts/CustomColorsContext';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <CustomColorsProvider>
        <FormatProvider>
          <AllPalettesProvider>
            <SinglePaletteProvider>
              <Routes />
            </SinglePaletteProvider>
          </AllPalettesProvider>
        </FormatProvider>
      </CustomColorsProvider>
    </div>
  );
}

export default App;