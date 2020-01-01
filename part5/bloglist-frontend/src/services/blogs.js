import axios from "axios";
const baseUrl = "/api/blogs";

const getAllBlogs = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export { getAllBlogs };
