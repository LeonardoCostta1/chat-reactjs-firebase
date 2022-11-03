const onlyUserReducer = (state = [], action) => {
    switch (action.type) {
      case "GET_USER_FOR_SEND_MESSAGE_SUCCESS":
        return action.user;
      default:
        return state;
    }
  };

  export default onlyUserReducer