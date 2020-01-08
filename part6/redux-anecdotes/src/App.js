import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { connect } from "react-redux";
import { getAllAnecdotes } from "./services/anecdotes";
import { initialize } from "./reducers/anecdoteReducer";

const App = props => {
  useEffect(() => {
    getAllAnecdotes().then(anecdotes => props.initialize(anecdotes));
  });
  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  );
};

export default connect(null, { initialize })(App);
