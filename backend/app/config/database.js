const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const setupDatabase = () => {
  if (
    //     Connection ready state
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting
    mongoose.connection.readyState !== 1 ||
    mongoose.connection.readyState !== 2
  ) {
    mongoose
      .connect(MONGO_URL, options)
      .then(() => {
        console.info('INFO - MongoDB Database connected.');
      })
      .catch((err) =>
        console.log('ERROR - Unable to connect to the database:', err)
      );
  }
};

module.exports = setupDatabase;
