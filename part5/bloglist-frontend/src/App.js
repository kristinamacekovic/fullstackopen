import React, { useState, useEffect } from "react";
import { useField } from "./hooks/index";
import { login } from "./services/login";
import { getAllBlogs, createBlog, setToken } from "./services/blogs";
import { Notification } from "./components/Notification";
import { Blog } from "./components/Blog";
import Toggable from "./components/Toggable";
import { AddForm } from "./components/AddForm";
/*import SimpleBlog from "./components/SimpleBlog";*/

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
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
      const user = await login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      const allBlogs = await getAllBlogs();
      const userBlogs = allBlogs.filter(blog => blog.author === user.username);
      setBlogs(userBlogs);
      username.onReset();
      password.onReset();
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
        <input name="username" id="username" {...username} />
      </div>
      <div>
        <label htmlFor="pass">Password:</label>
        <input name="password" id="pass" {...password} />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const handleAdd = async event => {
    event.preventDefault();
    const t = title.value;
    const a = author.value;
    const u = url.value;
    const newBlogPost = {
      title: t,
      author: a,
      url: u
    };

    await createBlog(newBlogPost);
    title.onReset();
    author.onReset();
    url.onReset();
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
          <Toggable buttonLabel="add post">
            <AddForm
              title={title}
              author={author}
              url={url}
              handleSubmit={handleAdd}
            ></AddForm>
          </Toggable>
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
