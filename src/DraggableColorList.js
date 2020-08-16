import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';

const DraggableColorList = SortableContainer((props) => {
  const {removeColor, colors} = props;

  // TESTING
  console.log("DRaggableColorList rendering");
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
