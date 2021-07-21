var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, order) => sum + order.likes, 0);
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, compared) => {
    return favorite.likes > compared.likes ? favorite : compared;
  });
}

const mostBlogs = (blogs) => {
  const bloggersObjects = _.reduce(blogs, (bloggers, blog) => {
    const index = _.findIndex(bloggers, ["name", blog.author]);
    if(index > -1) {
      bloggers[index].blogs += 1;
    } else {
      bloggers.push({name: blog.author, blogs: 1})      
    }
    return bloggers;

  }, []);
  const mostBlogs = _.reduce(bloggersObjects, (currentMostBlogs, blogger) => {
    if (currentMostBlogs.blogs < blogger.blogs) {
      currentMostBlogs = blogger;
    }
    return currentMostBlogs;
  })
  return mostBlogs;
}

const mostLikes = (blogs) => {
  const bloggersObjects = _.reduce(blogs, (bloggers, blog) => {
    const index = _.findIndex(bloggers, ["name", blog.author]);
    if(index > -1) {
      bloggers[index].likes += blog.likes;
    } else {
      bloggers.push({name: blog.author, likes: blog.likes})      
    }
    return bloggers;

  }, []);
  const mostLikes = _.reduce(bloggersObjects, (currentMostBlogs, blogger) => {
    if (currentMostBlogs.likes < blogger.likes) {
      currentMostBlogs = blogger;
    }
    return currentMostBlogs;
  })
  return mostLikes;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}