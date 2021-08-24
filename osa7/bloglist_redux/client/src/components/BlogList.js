import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="blog-list wrap">
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <div className='blogbox' key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        )}
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object
}

export default BlogList