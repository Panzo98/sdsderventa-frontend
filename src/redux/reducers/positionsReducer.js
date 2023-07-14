export const positionsReducer = (state = [], action) => {
  switch (action.type) {
    case "POSITIONS_FETCH": {
      return action.payload;
    }
    case "POSITIONS_CELAR": {
      return [];
    }
    case "UPDATE_POSITIONS": {
      return [...state, action.payload];
    }
    case "DELETE_POSITION": {
      const updatedList = state.filter(
        (position) => position.id !== action.payload
      );
      return updatedList;
    }
    default: {
      return state;
    }
  }
};
