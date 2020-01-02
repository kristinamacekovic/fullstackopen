import React, { useState, useEffect } from "react";
import { login } from "./services/login";
import { getAllBlogs, createBlog, setToken } from "./services/blogs";
import { Notification } from "./components/Notification";
import { Blog } from "./components/Blog";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      const populateBlogs = async () => {
        const allBlogs = await getAllBlogs();
        const userBlogs = allBlogs.filter(
          blog => blog.author === user.username
        );
        setBlogs(userBlogs);
      };
      populateBlogs();
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      setUsername("");
      setPassword("");
      const allBlogs = await getAllBlogs();
      const userBlogs = allBlogs.filter(blog => blog.author === user.username);
      setBlogs(userBlogs);
    } catch (exception) {
      setErrorMessage("Wrong credentials, please try again");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          id="pass"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const addForm = () => (
    <form onSubmit={handleAdd}>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          id="url"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );

  const handleAdd = async event => {
    event.preventDefault();
    const newBlogPost = {
      title,
      author,
      url
    };

    await createBlog(newBlogPost);
  };

  return (
    <div className="App">
      <h1>Blog App</h1>
      <Notification message={errorMessage} />
      <h2>Login</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>{user.username} is logged in</h2>
          <h2>Add Blog Post</h2>
          {addForm()}
          <h2>Blog posts</h2>
          <ul>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog}></Blog>
            ))}
          </ul>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default App;
