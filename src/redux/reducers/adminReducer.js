export const adminReducer = (
  state = { admin: {}, isLoggedIn: false },
  action
) => {
  switch (action.type) {
    case "ADMIN_LOGIN": {
      return {
        admin: action.payload,
        isLoggedIn: true,
      };
    }
    case "ADMIN_LOGOUT": {
      localStorage.removeItem("token");
      return {
        admin: {},
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};
