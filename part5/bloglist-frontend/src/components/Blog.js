import React from "react";
const Blog = ({ blog }) => (
  <li>
    <strong>{blog.title}</strong> - <em>{blog.author}</em>
  </li>
);

export { Blog };
