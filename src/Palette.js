import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Palette.css';

function Palette(props) {
  const [level, setLevel] = useState(500);
  const colorBoxes = props.palette.colors[level].map(color => (
    <ColorBox backgroundColor={color.hex} name={color.name} />
  ))

  return (
    <div className="Palette">
      <div className="Slider">
        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={(newLevel) => setLevel(newLevel)}/>
      </div>
      <div className="Palette-colors">
        {colorBoxes}
      </div>
    </div>
  )
}

export default Palette;