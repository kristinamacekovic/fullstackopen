import React, { useState } from "react";
import { login } from "./services/login";
import { getAllBlogs } from "./services/blogs";
import { Notification } from "./components/Notification";
import { Blog } from "./components/Blog";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      const allBlogs = await getAllBlogs();
      const userBlogs = allBlogs.filter(blog => blog.author === username);
      setBlogs(userBlogs);
    } catch (exception) {
      setErrorMessage("Wrong credentials, please try again");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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
          <h2>Blog posts</h2>
          <ul>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog}></Blog>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
