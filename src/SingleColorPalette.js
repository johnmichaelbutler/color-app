import React, { memo, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SinglePaletteContext } from './contexts/SinglePaletteContext';
import { FormatContext } from './contexts/FormatContext';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import useStyles from './styles/PaletteStyles';

function SingleColorPalette(props) {
  const { paletteId, colorId } = props.match.params;
  const { palette, changePalette, gatherShades } = useContext(SinglePaletteContext);
  const { format } = useContext(FormatContext);
  const classes = useStyles();

  const shades = gatherShades(palette, colorId);

  useEffect(() => {
    changePalette(paletteId);
  }, [paletteId]);


  // TESTING
  console.log("SingleColorPalette rendering");

  const colorBoxes = shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      backgroundColor={color[format]}
      showLink={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar isShowingOneColor />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to= {`/palette/${paletteId}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter palette={palette} />
    </div>
  )
}

export default memo(SingleColorPalette);