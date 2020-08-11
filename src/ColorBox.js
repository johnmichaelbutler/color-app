import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, withRouter } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, backgroundColor, id, paletteId, showLink } = props;
  const isDarkColor = chroma(backgroundColor).luminance() <= 0.08;
  const isLightColor = chroma(backgroundColor).luminance() >= 0.7;

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <CopyToClipboard text={backgroundColor} onCopy={changeCopyState}>
      <div style={{background: backgroundColor}} className="ColorBox">
        <div style={{background: backgroundColor}} className={`copy-overlay ${copied && "show"}`} />
        <div className={`copy-message ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p className={isLightColor ? "dark-text" : undefined}>{backgroundColor}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={ isDarkColor ? "light-text" : undefined}>
              {name}
            </span>
          </div>
          <button className={`copy-button ${isLightColor && "dark-text"}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className={`see-more ${isLightColor && "dark-text"}`}>MORE</ span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  )
};

export default withRouter(ColorBox);