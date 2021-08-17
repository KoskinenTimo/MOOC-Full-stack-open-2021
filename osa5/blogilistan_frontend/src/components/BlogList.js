import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'


const BlogList = ({
  blogs,
  user,
  setBlogs,
  setNotification
}) => {

  const handleLikeButton = async(blog) => {
    const updatedLikes = {
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, updatedLikes)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  return (
    <div>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <div className='blogbox' key={blog.id}>
            <Blog
              blog={blog}
              user={user}
              setBlogs={setBlogs}
              setNotification={setNotification}
              handleLikeButton={handleLikeButton}
            />
          </div>
        )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogList