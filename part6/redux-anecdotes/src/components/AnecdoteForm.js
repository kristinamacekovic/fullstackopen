import React from "react";
import { addNote } from "../reducers/anecdoteReducer";
import { addMessage, removeMessage } from "../reducers/messageReducer";

export const AnecdoteForm = props => {
  const addAnecdote = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    props.store.dispatch(addNote(content));
    props.store.dispatch(addMessage(content));
    setTimeout(() => props.store.dispatch(removeMessage()), 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
