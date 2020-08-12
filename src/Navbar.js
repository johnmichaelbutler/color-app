import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormatContext } from './contexts/FormatContext';
import { LevelContext } from './contexts/LevelContext';
import { SnackbarOpenContext } from './contexts/SnackbarOpenContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import './styles/Navbar.css';

function Navbar(props) {
  const { isShowingOneColor } = props;
  const { format, changeFormat } = useContext(FormatContext);
  const { level, changeLevel } = useContext(LevelContext);
  const { snackbarOpen, changeSnackbarOpen } = useContext(SnackbarOpenContext);

  const changeFormatAndRespond = event => {
    changeFormat(event);
    changeSnackbarOpen();
  }

  return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">reactcolorpicker</Link>
        </div>
        { !isShowingOneColor && (
          <div className="slider-container">
            <span>Level: {level}</span>
            <div className="Slider">
              <Slider
                defaultValue={level}
                min={100} max={900}
                step={100}
                onAfterChange={(newLevel) => changeLevel(newLevel)}
              />
            </div>
          </div>
        )}

        <div className="select-container">
          <Select value={format} onChange={changeFormatAndRespond}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "left" }}
          open={snackbarOpen}
          autoHideDuration={3000}
          message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
          ContentProps={{"aria-describedby": "message-id"}}
          onClose={changeSnackbarOpen}
          action={[
            <IconButton
              onClick={changeSnackbarOpen}
              color="inherit"
              key="close"
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
  )
}

export default Navbar;
