import React from "react";
import { vote, sort } from "../reducers/anecdoteReducer";
import { addMessage, removeMessage } from "../reducers/messageReducer";

export const AnecdoteList = props => {
  const { anecdotes, message } = props.store.getState();

  const voteFor = (id, content) => {
    props.store.dispatch(vote(id));
    props.store.dispatch(sort());
    props.store.dispatch(addMessage(content));
    setTimeout(() => props.store.dispatch(removeMessage()), 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
