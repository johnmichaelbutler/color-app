import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import { PaletteProvider } from './contexts/PaletteContext';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';

import './App.css';


function App() {



  return (
    <div className="App">
      <FormatProvider>
        <SnackbarOpenProvider>
          <LevelProvider>
            <PaletteProvider>

              <Switch>
                <Route exact path='/' render={() => <h1>Palette List</h1>} />
                <Route exact path='/palette/:id' render={(props) => <Palette {...props} />} />
              </Switch>
              {/* <Palette /> */}
            </PaletteProvider>
          </LevelProvider>
        </SnackbarOpenProvider>
      </FormatProvider>
    </div>
  );
}

export default App;

// palette={generatePalette(findPalette(routeProps.match.params.id))}
