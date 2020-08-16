import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
  const { name, color, removeColor } = props;
  const classes = useStyles(props);



  // TESTING
  console.log("DraggableColorBox rendering");
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
