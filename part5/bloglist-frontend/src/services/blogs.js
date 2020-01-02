import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAllBlogs = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export { getAllBlogs, createBlog, setToken };
