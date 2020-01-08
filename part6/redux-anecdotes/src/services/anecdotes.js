import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";
const getAllAnecdotes = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};
export { getAllAnecdotes };
