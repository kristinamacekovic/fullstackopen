import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <p>
      <strong>{blog.title}</strong> - <em>{blog.author}</em>
    </p>
  </div>
)

export { Blog }
