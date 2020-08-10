import React, { useContext } from 'react';
import { FormatContext } from './contexts/FormatContext';
import { LevelContext } from './contexts/LevelContext';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

import './Palette.css';

function Palette(props) {
  const { format } = useContext(FormatContext);
  const { level } = useContext(LevelContext);

  const colorBoxes = props.palette.colors[level].map(color => (
    <ColorBox backgroundColor={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <Navbar />
      <div className="Palette-colors">
        {colorBoxes}
      </div>
    </div>
  )
}

export default Palette;