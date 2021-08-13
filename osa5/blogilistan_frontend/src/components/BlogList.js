import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import PropTypes from 'prop-types'


const BlogList = ({
  blogs,
  user,
  setBlogs,
  setNotification
}) => {
  return (
    <div>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <div className='blogbox' key={blog.id}>
            <Togglable text={`${blog.title} ${blog.author} `} label={'View'}>
              <Blog
                blog={blog}
                user={user}
                setBlogs={setBlogs}
                setNotification={setNotification}
              />
            </Togglable>
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