import arrayMove from 'array-move';
const CustomColorsReducer = (state, action) => {
  switch(action.type) {
    case "ADD_NEW_COLOR":
      return [...state, action.payload];
    case "REMOVE_COLOR":
      return state.filter(color => color.name !== action.payload)
    case "ON_SORT_END":
      return arrayMove(state, action.payload.oldInd, action.payload.newInd);
    case "CLEAR_COLORS":
      return [];
    default:
      return state;
  }
}

export default CustomColorsReducer;




/*
{type: "ADD_RANDOM_COLOR", payload: ""}
const addRandomColor = () => {
  const allColors = allPalettes.map(p => p.colors).flat();
  let rand = Math.floor(Math.random() * allColors.length);
  let randomColor = allColors[rand];
  let isDuplicateColor = true;
  while(isDuplicateColor) {
    rand = Math.floor(Math.random() * allColors.length);
    randomColor = allColors[rand];
    isDuplicateColor = customColors.some(color => color.name === randomColor.name)
  }
  const {color, name} = randomColor
  const newColor = {color: color, name: name};
  setCustomColors([...customColors, newColor]);
}


{type: "REMOVE_COLOR", payload: ""}
const removeColor = (colorName) => {
  const filteredColors = customColors.filter(color => color.name !== colorName)
  setCustomColors(filteredColors);
}


{type: "ADD_NEW_COLOR", payload: ""}
const addNewColor = () => {
  const newColor = {
    color: currentColor,
    name: newColorName
  }
  setCustomColors([...customColors, newColor]);
  setNewColorName("");
}

*/