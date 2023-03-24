const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: { type: String, unique: true },
  address: String,
});
const fakeUsers = mongoose.model('fakeUsers', userSchema);
module.exports = fakeUsers;
