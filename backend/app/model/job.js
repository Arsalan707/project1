const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: Number,
});
module.exports = mongoose.model('fakeUsers', userSchema);
