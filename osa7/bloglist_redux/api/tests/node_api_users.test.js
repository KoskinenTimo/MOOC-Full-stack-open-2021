const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { users,getUserFromDb } = require('./testHelperForUsers');
const app = require('../app');
const api = supertest(app);


beforeEach(async() => {
  await User.deleteMany({});
  await User.insertMany(users);
});


describe('test HTTP GET /api/users', () => {

  test('get all users from db', async () => {
    const res = await api.get('/api/users');
    expect(res.body.length).toBe(users.length);
  });
});


describe('test HTTP POST /api/users', () => {
  
  test('no username property error', async () => {
    const noUsernameUser = {
      password: "password",
      name: "Test Name"
    }
    const res = await api
      .post('/api/users')
      .send(noUsernameUser)
      .expect(400)
    expect(res.body.error).toContain("Username is required");
  });

  test('username is too short error', async () => {
    const invalidUsernameUser = {
      username: "to",
      password: "password",
      name: "Test Name"
    }
    const res = await api
      .post('/api/users')
      .send(invalidUsernameUser)
      .expect(400)
    expect(res.body.error).toContain("Username must be atleast 3 characters long");
  });

  test('username already exists error', async () => {
    const notUniqueUsernameUser = {
      username: "timokoskinen",
      password: "password",
      name: "Test Name"
    }
    const res = await api
      .post('/api/users')
      .send(notUniqueUsernameUser)
      .expect(400)
    expect(res.body.error).toContain("Username already exists");
  });

  test('username posted succesfully', async () => {
    const usersAtTheStart = await getUserFromDb();
    const length = usersAtTheStart.length + 1;
    const validUser = {
      username: "taunotai",
      password: "password",
      name: "Tauno Taikuri"
    }
    const res = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
    expect(res.body.username).toEqual(validUser.username);
    const usersAtTheEnd = await getUserFromDb();
    expect(usersAtTheEnd).toHaveLength(length);
  })
});

afterAll(() => {
  mongoose.connection.close();
});