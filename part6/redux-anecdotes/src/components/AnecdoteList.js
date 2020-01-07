import React from "react";
import { vote, sort } from "../reducers/anecdoteReducer";

export const AnecdoteList = props => {
  const anecdotes = props.store.getState();

  const voteFor = id => {
    props.store.dispatch(vote(id));
    props.store.dispatch(sort());
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
