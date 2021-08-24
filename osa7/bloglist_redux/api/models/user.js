const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [3, "Username must be atleast 3 characters long"],
    maxLength: [15, "Username can be max 15 characters long"]
  },
  passwordHash: String,
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.plugin(uniqueValidator, { message:"Username already exists"});
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;