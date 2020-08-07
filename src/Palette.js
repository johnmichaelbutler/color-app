import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

import './Palette.css';

function Palette(props) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const colorBoxes = props.palette.colors[level].map(color => (
    <ColorBox backgroundColor={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <Navbar format={format} level={level} setLevel={setLevel} setFormat={setFormat} />
      <div className="Palette-colors">
        {colorBoxes}
      </div>
    </div>
  )
}

export default Palette;