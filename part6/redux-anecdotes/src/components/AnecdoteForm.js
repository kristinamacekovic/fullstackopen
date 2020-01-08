import React from "react";
import { connect } from "react-redux";
import { addNote } from "../reducers/anecdoteReducer";
import { addMessage, removeMessage } from "../reducers/messageReducer";
import { createNewAnecdote } from "../services/anecdotes";

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const newAnecdote = await createNewAnecdote(content);
    props.addNote(newAnecdote);
    props.addMessage(newAnecdote.content);
    setTimeout(() => props.removeMessage(), 5000);
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

const mapDispatchToProps = {
  addNote,
  addMessage,
  removeMessage
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
