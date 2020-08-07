import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './Navbar.css';

function Navbar(props) {
  const {level, setFormat, format, setLevel} = props;

  const handleChange = e => {
    setFormat(e.target.value);
  }
  return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="Slider">
            <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={(newLevel) => setLevel(newLevel)}/>
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
      </header>
  )
}

export default Navbar
