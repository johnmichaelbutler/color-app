import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import { SinglePaletteProvider } from './contexts/SinglePaletteContext';
import { AllPalettesProvider } from './contexts/AllPalettesContext';
import { DrawerOpenProvider } from './contexts/DrawerOpenContext';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';

import './App.css';
import SingleColorPalette from './SingleColorPalette';

function App() {

  return (
    <div className="App">
      <FormatProvider>
        <DrawerOpenProvider>
          <SnackbarOpenProvider>
            <LevelProvider>
              <AllPalettesProvider>
                <SinglePaletteProvider>
                  <Switch>
                    <Route exact path="/palette/new" render={() => <NewPaletteForm/>} />
                    <Route exact path='/' render={() => <PaletteList />} />
                    <Route exact path='/palette/:id' render={(props) => <Palette {...props} />} />
                    <Route exact path='/palette/:paletteId/:colorId' render={(props) => <SingleColorPalette {...props} />} />
                  </Switch>
                </SinglePaletteProvider>
              </AllPalettesProvider>
            </LevelProvider>
          </SnackbarOpenProvider>
        </DrawerOpenProvider>
      </FormatProvider>
    </div>
  );
}

export default App;