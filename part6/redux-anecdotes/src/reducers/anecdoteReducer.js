import { getAllAnecdotes } from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.data];
    case "VOTE_FOR":
      const id = action.data.id;
      const noteToChange = state.find(note => note.id === id);
      const changedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1
      };
      return state.map(note => (note.id === id ? changedNote : note));
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
  return {
    type: "ADD",
    data
  };
};

export const vote = id => {
  return {
    type: "VOTE_FOR",
    data: { id }
  };
};

export const sort = () => {
  return {
    type: "SORT"
  };
};

export const initialize = notes => {
  return async dispatch => {
    const anecdotes = await getAllAnecdotes();
    dispatch({
      type: "INIT",
      data: anecdotes
    });
  };
};

export default anecdoteReducer;
