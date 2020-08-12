import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import useStyles from './styles/PaletteListStyles';

function PaletteList(props) {
  const { allPalettes } = useContext(AllPalettesContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div classes={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {allPalettes.map(palette=> (
            <MiniPalette key={palette.paletteName} {...palette} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaletteList;