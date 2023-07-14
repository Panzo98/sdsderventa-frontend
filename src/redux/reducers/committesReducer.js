export const committesReducer = (state = [], action) => {
  switch (action.type) {
    case "COMMITTES_FETCH": {
      return action.payload;
    }
    case "COMMITTES_CELAR": {
      return [];
    }
    case "UPDATE_COMMITTES": {
      return [...state, action.payload];
    }
    case "DELETE_COMMITTE": {
      const updatedList = state.filter(
        (commmitte) => commmitte.id !== action.payload
      );
      return updatedList;
    }
    default: {
      return state;
    }
  }
};
