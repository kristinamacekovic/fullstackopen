import React from "react";
import { connect } from "react-redux";
import { addNote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    props.addNote(content);
    props.setNotification(content, 5);
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
  setNotification
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
