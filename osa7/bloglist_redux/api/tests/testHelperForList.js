var _ = require('lodash');
const blogs = require('./blogs');


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

console.log(mostLikes(blogs));
