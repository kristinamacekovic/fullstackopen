import React from "react";
const AddForm = () => (
  <form onSubmit={props.handleAdd}>
    <label htmlFor="title">title</label>
    <input type="text" name="title" id="title" />
    <label htmlFor="author">author</label>
    <input type="text" name="author" id="author" />
    <label htmlFor="url">url</label>
    <input type="text" name="url" id="url" />
    <button type="submit">Add</button>
  </form>
);

export { Blog };
