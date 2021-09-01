const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
    max: [2010, "Must be born before 2010"],
    min: [0, "Must be born year 0 or after"]
  },
})

module.exports = mongoose.model('Author', schema)