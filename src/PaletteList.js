import React from 'react';
import seedColors from './seedColors';
import { Link } from 'react-router-dom';

export default function PaletteList() {
  return (
    <div>
      <h1>React Colors</h1>
      {seedColors.map(palette => (
        <p>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </div>
  )
}

// export default PaletteList;