import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import {FormatProvider} from './contexts/FormatContext';
import { LevelProvider } from './contexts/LevelContext';
import { SnackbarOpenProvider } from './contexts/SnackbarOpenContext';
import { SinglePaletteProvider } from './contexts/SinglePaletteContext';
import { AllPalettesProvider } from './contexts/AllPalettesContext';
import { DrawerOpenProvider } from './contexts/DrawerOpenContext';
import { NewPaletteNameProvider } from './contexts/NewPaletteNameContext';
import { CurrentColorProvider } from './contexts/CurrentColorContext';
import { CustomColorsProvider }from './contexts/CustomColorsContext';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';

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
                          <CSSTransition key={location.key} classNames='page' timeout={500}>
                            <Switch location={location}>
                              <Route
                                exact
                                path="/palette/new"
                                render={() => <Page><NewPaletteForm/></Page>}
                              />
                              <Route
                                exact path='/'
                                render={() => <Page><PaletteList /></Page>}
                                />
                              <Route
                                exact
                                path='/palette/:id'
                                render={(props) => <Page><Palette {...props} /></Page>}
                              />
                              <Route
                                exact
                                path='/palette/:paletteId/:colorId'
                                render={(props) => <Page><SingleColorPalette {...props} /></Page>}
                              />
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