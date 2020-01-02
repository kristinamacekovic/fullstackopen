import React from "react";
const AddForm = ({
  title,
  author,
  url,
  handleSubmit,
  handleTitle,
  handleAuthor,
  handleURL
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">title</label>
      <input
        value={title}
        type="text"
        name="title"
        id="title"
        onChange={handleTitle}
      />
    </div>
    <div>
      <label htmlFor="author">author</label>
      <input
        value={author}
        type="text"
        name="author"
        id="author"
        onChange={handleAuthor}
      />
    </div>
    <div>
      <label htmlFor="url">url</label>
      <input value={url} type="text" name="url" id="url" onChange={handleURL} />
    </div>
    <button type="submit">Add</button>
  </form>
);

export { AddForm };
