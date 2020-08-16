const PaletteReducer = (state, action) => {
  switch(action.type) {
    case "ADD_PALETTE":
      return [...state, action.payload]
    case "DELETE_PALETTE":
      return state.filter(palette => palette.id !== action.payload);
    default:
      return state;
  }
}

export default PaletteReducer;
