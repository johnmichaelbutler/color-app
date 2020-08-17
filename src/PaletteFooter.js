import React, {memo} from 'react'

function PaletteFooter(props) {
  const {palette} = props;

  return (
    <div>
      <footer className="Palette-footer">
        {palette.paletteName}
        <span className='emoji'>{palette.emoji}</span>
      </footer>
    </div>
  )
}

export default memo(PaletteFooter);
