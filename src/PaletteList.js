import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useStyles from './styles/PaletteListStyles';

function PaletteList(props) {
  const { allPalettes } = useContext(AllPalettesContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div classes={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {allPalettes.map(palette=> (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
              <MiniPalette key={palette.paletteName} colors={palette.colors} id={palette.id} {...palette} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default PaletteList;