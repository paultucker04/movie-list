const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
