import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { CustomColorsContext } from './contexts/CustomColorsContext';
import useStyles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'
import { AllPalettesContext } from './contexts/AllPalettesContext';

function MiniPalette(props) {
  const classes = useStyles();
  const{ paletteName, emoji, id, history } = props;
  const { customColors } = useContext(CustomColorsContext);
  const { deletePalette } = useContext(AllPalettesContext);

  const deleteAPalette = (e) => {
    e.stopPropagation();
    deletePalette(id);
  }

  const goToPalette = id => {
    history.push(`/palette/${id}`)
  }

  const miniColorBoxes = customColors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
    />
  ))
  return (
    <div className={classes.root} onClick={() => goToPalette(id)}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{transition: "all 0.3s ease-in-out"}}
        onClick={deleteAPalette}
      />
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
    <h5 className={classes.title}>
      {paletteName}<span className={classes.emoji}>{emoji}</span>
    </h5>
    </div>
  )
}

export default withRouter(MiniPalette);
