import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createNewAnecdote = async content => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseURL, newAnecdote);
  return response.data;
};

const incrementAnecdote = async id => {
  const allAnecdotes = await axios.get(baseURL);
  console.log(allAnecdotes);
  const findAnecdote = allAnecdotes.data.find(anecdote => id === anecdote.id);
  const updatedAnecdote = await axios.put(`${baseURL}/${id}`, {
    ...findAnecdote,
    votes: findAnecdote.votes + 1
  });
  return updatedAnecdote.data;
};

export { getAllAnecdotes, createNewAnecdote, incrementAnecdote };
