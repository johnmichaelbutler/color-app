import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Navbar.css';

function Navbar(props) {
  const {level, setLevel} = props;
  return (
    <div>
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
        </div>
        <div className="Slider">
        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={(newLevel) => setLevel(newLevel)}/>
      </div>
      </header>
    </div>
  )
}

export default Navbar
