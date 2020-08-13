import React from 'react';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import { SinglePaletteProvider } from './contexts/SinglePaletteContext';
import { AllPalettesProvider } from './contexts/AllPalettesContext';
import { DrawerOpenProvider } from './contexts/DrawerOpenContext';
import { NewPaletteNameProvider } from './contexts/NewPaletteNameContext';
import { CurrentColorProvider } from './contexts/CurrentColorContext';
import { CustomColorsProvider }from './contexts/CustomColorsContext';
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <FormatProvider>
        <DrawerOpenProvider>
          <SnackbarOpenProvider>
            <LevelProvider>
              <AllPalettesProvider>
                <CustomColorsProvider>
                  <CurrentColorProvider>
                    <NewPaletteNameProvider>
                      <SinglePaletteProvider>
                        <Route render={({location}) =>
                        <TransitionGroup>
                          <CSSTransition key={location.key}classNames='fade' timeout={500}>
                            <Switch location={location}>
                              <Route exact path="/palette/new" render={() => <div className='page'><NewPaletteForm/></div>} />
                              <Route exact path='/' render={() => <PaletteList />} />
                              <Route exact path='/palette/:id' render={(props) => <div className='page'><Palette {...props} /></div>} />
                              <Route exact path='/palette/:paletteId/:colorId' render={(props) => <div className='page'><SingleColorPalette {...props} /></div>} />
                            </Switch>
                          </CSSTransition>
                        </TransitionGroup>
                        } />
                      </SinglePaletteProvider>
                    </NewPaletteNameProvider>
                  </CurrentColorProvider>
                </CustomColorsProvider>
              </AllPalettesProvider>
            </LevelProvider>
          </SnackbarOpenProvider>
        </DrawerOpenProvider>
      </FormatProvider>
    </div>
  );
}

export default App;