const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_FETCH_SUCCEEDED':
      return action.user;
    default:
      return state;
  }
};

export default userReducer
