import React, { useContext, useEffect } from 'react';
import { FormatContext } from './contexts/FormatContext';
import { LevelContext } from './contexts/LevelContext';
import { PaletteContext } from './contexts/PaletteContext';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

import './Palette.css';

function Palette(props) {

  const id = props.match.params.id;
  const { format } = useContext(FormatContext);
  const { level } = useContext(LevelContext);
  const { palette, changePalette } = useContext(PaletteContext);

  useEffect(() => {
    console.log(id)
    changePalette(id);
  }, [id]);

  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox key={color.id} backgroundColor={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <Navbar />
      <div className="Palette-colors">
        {colorBoxes}
      </div>
      <footer className="Palette-footer">
        {palette.paletteName}
        <span className='emoji'>{palette.emoji}</span>
      </footer>
    </div>
  )
};

export default Palette;