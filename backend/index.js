const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./app/route/route');
const setupDatabase = require('./app/config/database');

setupDatabase();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', userRoute);

app.use('*', (req, res) => {
  res.json('page is not found');
});

app.listen(3001, () => {
  console.log('server is running on 3001 port');
});
