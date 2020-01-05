import React from "react";
import PropTypes from "prop-types";

const AddForm = ({ title, author, url, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">title</label>
        <input {...title} />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input {...author} />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input {...url} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

AddForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export { AddForm };
