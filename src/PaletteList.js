import React from 'react';
import seedColors from './seedColors';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';

export default function PaletteList() {
  return (
    <div>
      <h1>React Colors</h1>
      <MiniPalette />
      {seedColors.map(palette => (
        <MiniPalette {...palette} />
      ))}
    </div>
  )
}

// export default PaletteList;