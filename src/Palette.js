import React, { useContext, memo, useEffect, useState } from 'react';
import { FormatContext } from './contexts/FormatContext';
import { SinglePaletteContext } from './contexts/SinglePaletteContext';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';


import useStyles from './styles/PaletteStyles.js';

function Palette(props) {

  const id = props.match.params.id;
  const { format } = useContext(FormatContext);
  const [level, setLevel] = useState(500);
  const { palette, changePalette } = useContext(SinglePaletteContext);
  const classes = useStyles();

  useEffect(() => {
    changePalette(id);
  }, [id]);

  const changeLevel = (level) => {
    setLevel(level);
  }

  // TESTING
  console.log("Palette rendering");

  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox
      key={color.id}
      paletteId={id}
      id={color.id}
      backgroundColor={color[format]}
      name={color.name}
      showLink
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
      />
      <div className={classes.colors}>
        {colorBoxes}
      </div>
      <PaletteFooter palette={palette} />
    </div>
  )
};

export default memo(Palette);