import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';

const DraggableColorList = SortableContainer((props) => {
  const {colors, removeColor} = props;
  return (
    <div style={{height: "100%"}}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          removeColor={() =>removeColor(color.name)}
        />
      ))}
    </div>
  )
})

export default DraggableColorList;
