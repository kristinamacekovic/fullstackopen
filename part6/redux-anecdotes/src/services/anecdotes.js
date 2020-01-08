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

export { getAllAnecdotes, createNewAnecdote };
