import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';

function Routes() {
  return (
    <>
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
              <Route
                render={() => <Page><PaletteList /></Page>}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      } />
    </>
  )
}

export default Routes;
