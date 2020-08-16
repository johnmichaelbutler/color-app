import React, {memo} from 'react';
import { withRouter } from 'react-router-dom';
import useStyles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'

function MiniPalette(props) {
  const classes = useStyles();
  const{ paletteName, emoji, id, history, colors, openDialog } = props;

  const deleteAPalette = (e) => {
    e.stopPropagation();
    openDialog(id);
  }

  const handleClick = () => {
    history.push(`/palette/${id}`)
  }

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
    />
  ))


  // TESTING
  console.log("MiniPalette rendering");
  return (
    <div className={classes.root} onClick={handleClick}>
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

export default memo(withRouter(MiniPalette));
