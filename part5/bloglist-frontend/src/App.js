import React, { useEffect, useState } from 'react'
import { getAll } from './services/blogs'
import { Blog } from './components/Blog'

const App = () => {
  const [allBlogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await getAll()
      setBlogs(allBlogs)
    }
    fetchBlogs()
  }, [])
  return (
    <div className='App'>
      <h1>All blogs</h1>
      <ul>
        {allBlogs.map(blog => (
          <Blog blog={blog}></Blog>
        ))}
      </ul>
    </div>
  )
}

export default App
