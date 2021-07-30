const express = require('express')
const config = require('./utils/config');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRoutes = require('./controllers/blogs');
const usersRoutes = require('./controllers/users');
const loginRoutes = require('./controllers/login');
const middleware = require('./utils/middleware');


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/login', loginRoutes);
app.use(middleware.routeNotFound);
app.use(middleware.errorHandler);


module.exports = app;