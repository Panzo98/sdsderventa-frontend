export const membersReducer = (state = [], action) => {
  switch (action.type) {
    case "MEMBERS_FETCH": {
      return action.payload;
    }
    case "MEMBERS_CLEAR": {
      return [];
    }
    case "DELETE_MEMBER": {
      const updatedList = state.filter(
        (member) => member.id !== action.payload
      );
      return updatedList;
    }
    default: {
      return state;
    }
  }
};
