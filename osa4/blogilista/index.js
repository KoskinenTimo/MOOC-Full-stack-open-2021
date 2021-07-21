const config = require('./utils/config');
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRoutes = require('./controllers/blogs');


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRoutes);


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})