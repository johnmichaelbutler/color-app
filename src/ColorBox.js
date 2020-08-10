import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, backgroundColor } = props;

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
          <p>{backgroundColor}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">
            Copy
          </button>
        </div>
        <Link to="/" onClick={e => e.stopPropagation()}>
          <span className="see-more">More</span>
        </Link>
      </div>
    </CopyToClipboard>
  )
};

export default ColorBox;