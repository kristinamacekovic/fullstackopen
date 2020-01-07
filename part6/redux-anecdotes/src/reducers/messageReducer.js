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

export const addMessage = message => {
  return {
    type: "WRITE",
    message
  };
};

export const removeMessage = () => {
  return {
    type: "ERASE"
  };
};

export default messageReducer;
