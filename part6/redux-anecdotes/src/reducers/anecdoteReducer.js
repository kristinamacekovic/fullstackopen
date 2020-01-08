import {
  getAllAnecdotes,
  createNewAnecdote,
  incrementAnecdote
} from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.data];
    case "VOTE_FOR":
      return [...state];
    case "SORT":
      const newStore = [...state];
      newStore.sort((a, b) => b.votes - a.votes);
      return newStore;
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const addNote = data => {
  return async dispatch => {
    const newData = await createNewAnecdote(data);
    dispatch({
      type: "ADD",
      data: newData
    });
  };
};

export const vote = id => {
  return async dispatch => {
    const newData = await incrementAnecdote(id);
    dispatch({
      type: "VOTE_FOR",
      data: newData
    });
  };
};

export const sort = () => {
  return {
    type: "SORT"
  };
};

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await getAllAnecdotes();
    dispatch({
      type: "INIT",
      data: anecdotes
    });
  };
};

export default anecdoteReducer;
