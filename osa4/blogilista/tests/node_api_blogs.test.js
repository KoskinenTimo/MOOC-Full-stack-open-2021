const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const { blogs,getBlogsInDb } = require('./blogTestHelper');
const app = require('../app');
const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe('test HTTP GET /api/blogs', () => {
  test('returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returned response length matches seed', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(blogs.length);
  });

  test('blog objects have the correct property id', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });
});

describe('test HTTP POST /api/blogs', () => {
  test('post new note to db', async () => {
    const blog = {
      "title": "Code battle",
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      "likes": 6
    }
    const responseBlog = await api.post('/api/blogs').send(blog);
    expect(responseBlog.body.title).toBe("Code battle");
    const responseBlogList = await api.get('/api/blogs');
    expect(responseBlogList.body).toHaveLength(blogs.length + 1);
  });

  test('likes have default value of 0', async () => {
    const blog = {
      "title": "Code war",
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }
    const responseBlog = await api.post('/api/blogs').send(blog);
    expect(responseBlog.body.likes).toBe(0);
  });

  test('required fields missing and api gives status 400', async () => {
    const blogWithoutUrl = {
      "title": "Code war",
      "author": "Robert C. Martin"
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400);

    const blogWithoutTitle = {
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }
    await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400);
  });
});

describe('test HTTP DELETE /api/blogs/:id', () => {
  test('api returns correct status after deleting and checking if it exists in db', async () => {
    const blogsInDb = await getBlogsInDb();
    const blogIdToRemove = blogsInDb[0].id;
    await api
      .delete(`/api/blogs/${blogIdToRemove}`)
      .expect(204);
    await api
      .get(`/api/blogs/${blogIdToRemove}`)
      .expect(404)
  });
});

describe('test HTTP PUT /api/blogs/:id', () => {

  test('succesful update with correct values', async () => {
    const blogsInDb = await getBlogsInDb();
    const blogIdToUpdate = blogsInDb[0].id;
    const updateBody = {
      "title": "Code war",
      "author": "Robert C. Martin"
    }
    await api
      .put(`/api/blogs/${blogIdToUpdate}`)
      .send(updateBody)
      .expect(200);
    const blogsInDbAfterUpdate = await getBlogsInDb();
    const titles = blogsInDbAfterUpdate.map(blog => blog.title);
    expect(titles).toContain("Code war");
  });
  test('unsuccesful update with incorrect values', async () => {
    const blogsInDb = await getBlogsInDb();
    const blogIdToUpdate = blogsInDb[0].id;
    const updateBody = {
      "title": ""
    }
    await api
      .put(`/api/blogs/${blogIdToUpdate}`)
      .send(updateBody)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close();
});