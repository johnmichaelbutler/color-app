import React, { useContext } from 'react';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles/DraggableColorBoxStyles';
import {ColorDispatchContext} from './contexts/CustomColorsContext';

const DraggableColorBox = SortableElement((props) => {
  const { name, color } = props;
  const colorsDispatch = useContext(ColorDispatchContext);
  const classes = useStyles(props);

  const removeColor = () => {
    colorsDispatch({type: "REMOVE_COLOR", payload: name})
  }

  return (
    <div
      className={classes.root}
      style={{backgroundColor: color}}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={removeColor} />
      </div>
    </div>
  )
})

export default DraggableColorBox;
