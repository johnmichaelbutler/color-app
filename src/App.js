import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import { PaletteProvider } from './contexts/PaletteContext';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';

import './App.css';

function App() {

  return (
    <div className="App">
      <FormatProvider>
        <SnackbarOpenProvider>
          <LevelProvider>
            <PaletteProvider>
              <Switch>
                <Route exact path='/' render={() => <PaletteList />} />
                <Route exact path='/palette/:id' render={(props) => <Palette {...props} />} />
                <Route exact path='/palette/:paletteId/:colorId' render={() => <h1>Single Color Page</h1>} />
              </Switch>
            </PaletteProvider>
          </LevelProvider>
        </SnackbarOpenProvider>
      </FormatProvider>
    </div>
  );
}

export default App;

// palette={generatePalette(findPalette(routeProps.match.params.id))}
