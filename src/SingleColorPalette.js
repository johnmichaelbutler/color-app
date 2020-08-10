import React, { useContext, useEffect } from 'react';
import { PaletteContext } from './contexts/PaletteContext';

import ColorBox from './ColorBox';

function SingleColorPalette(props) {
  const { paletteId, colorId } = props.match.params;

  const { palette, changePalette, gatherShades } = useContext(PaletteContext);

  const shades = gatherShades(palette, colorId);

  useEffect(() => {
    changePalette(paletteId);
  }, [paletteId]);

  const colorBoxes = shades.map(color => (
    <ColorBox key={color.id} name={color.name} backgroundColor={color.hex} showLink={false} />
  ));

  return (
    <div className='Palette'>
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  )
}

export default SingleColorPalette;