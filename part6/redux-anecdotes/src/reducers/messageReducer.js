const initialState = "";

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WRITE":
      return action.message;
    case "ERASE":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: "WRITE",
      message
    });
    setTimeout(
      () =>
        dispatch({
          type: "ERASE"
        }),
      duration * 1000
    );
  };
};

export default messageReducer;
