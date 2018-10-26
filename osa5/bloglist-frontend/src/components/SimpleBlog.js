import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blog">
    <div className="blogtitle">
      {blog.title} {blog.author}
    </div>
    <div className="content"> 
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog