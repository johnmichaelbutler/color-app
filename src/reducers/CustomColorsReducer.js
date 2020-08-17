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