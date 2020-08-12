import React, { useContext } from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';
import {CustomColorsContext} from './contexts/CustomColorsContext';

const DraggableColorList = SortableContainer((props) => {
  const {removeColor} = props;
  const {customColors} = useContext(CustomColorsContext);
  return (
    <div style={{height: "100%"}}>
      {customColors.map((color, i) => (
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
