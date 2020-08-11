import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';

import './PaletteList.css';
import { useContext } from 'react';
import { AllPalettesContext } from './contexts/AllPalettesContext';

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
      textDecoration: "none"
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%"
  }
}


function PaletteList(props) {
  const { allPalettes } = useContext(AllPalettesContext);
  const { classes } = props;
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

export default withStyles(styles)(PaletteList);