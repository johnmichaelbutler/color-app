import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import useStyles from './styles/ColorBoxStyles.js';

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, backgroundColor, id, paletteId, showLink } = props;

  const classes = useStyles(props);

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }


  // TESTING
  console.log("ColorBox rendering");

  return (
    <CopyToClipboard text={backgroundColor} onCopy={changeCopyState}>
      <div style={{background: backgroundColor}} className={classes.ColorBox}>
      <div style={{ background: backgroundColor }} className={clsx(classes.copyOverlay, {[classes.showOverlay]: copied})}/>
        <div className={clsx(classes.copyMessage, {[classes.showMessage]: copied})}>
          <h1>Copied!</h1>
          <p className={classes.copyText}>{backgroundColor}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>
              {name}
            </span>
          </div>
          <button className={classes.copyButton}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</ span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  )
};

export default withRouter(ColorBox);