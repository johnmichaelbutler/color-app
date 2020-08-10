import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { PaletteContext } from './contexts/PaletteContext';
import { FormatContext } from './contexts/FormatContext';


import ColorBox from './ColorBox';

function SingleColorPalette(props) {
  const { paletteId, colorId } = props.match.params;

  const { palette, changePalette, gatherShades } = useContext(PaletteContext);
  const { format } = useContext(FormatContext);

  const shades = gatherShades(palette, colorId);

  useEffect(() => {
    changePalette(paletteId);
  }, [paletteId]);

  const colorBoxes = shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      backgroundColor={color[format]}
      showLink={false}
    />
  ));

  return (
    <div className='Palette SingleColorPalette'>
      <Navbar isShowingOneColor />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to= {`/palette/${paletteId}`} className="back-button">Go Back</Link>
        </div>
        </div>
      <PaletteFooter palette={palette} />
    </div>
  )
}

export default SingleColorPalette;