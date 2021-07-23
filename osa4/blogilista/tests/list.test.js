const listHelper = require('../utils/list_helper');
const { blogs } = require('./blogTestHelper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {

  test('calculate likes from first blog in db', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });

  test('calculate likes from all blogs in db', () => {
  const result = listHelper.totalLikes(blogs);
  expect(result).toBe(36);
  });  
});

describe('most liked', () => {
  test('what is the most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs);    
    expect(result._id).toBe("5a422b3a1b54a676234d17f9");
  });
});

describe('most active and liked blogger', () => {
  test('what is the most active blogger', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ name: 'Robert C. Martin', blogs: 3 })
  });

  test('what blogger has most likes combined', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ name: 'Edsger W. Dijkstra', likes: 17 });
  })
});