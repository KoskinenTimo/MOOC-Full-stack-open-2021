const User = require('../models/user');


const users = [
  {
  _id: "6103ebefc380e2033c4915bc",
  username: "timokoskinen",
  passwordHash: "$2a$10$2HpdJ4CDiGYc/q3r4JFDf.6j9lP6Pkf7GS8kFfN3TG7a/nFhlDoIS",
  name: "Timo Koskinen",
  blogs: ["5a422a851b54a676234d17f7"],
  __v: 0
  },
  {
  _id: "6103ec21dfc1a238f42cc5c6",
  username: "mattimeika",
  passwordHash: "$2a$10$3QWWmn9EQLCETyLg9RyC4.7psdEi1mn2OBpaRvdGbWPzXrjlQ8Km2",
  name: "Matti Meikäläinen",
  blogs: [
    "5a422aa71b54a676234d17f8",
    "5a422b3a1b54a676234d17f9",
    "5a422b891b54a676234d17fa"
  ],
  __v: 0
  },
  {
  _id: "6103ec3bdfc1a238f42cc5ca",
  username: "tuomasveturi",
  passwordHash: "$2a$10$lxUxAD.fjwzXAVQRwp4ypOLPCl7b/gbDeXqqmxBsFQZOhP/H46G3a",
  name: "Tuomas Veturi",
  blogs: [
    "5a422b3a1b54a676234d17f9",
    "5a422bc61b54a676234d17fc",
    "5a422ba71b54a676234d17fb"

  ],
  __v: 0
  }
]

const getUserFromDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
}

module.exports = {
  users,
  getUserFromDb
};