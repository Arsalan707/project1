const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
const axios = require('axios');
const fakeUsers = require('../model/model');
const Agenda = require('agenda');

const { MONGO_URL } = process.env;

// var uniqueEmails = db.users.distinct('email');
// sava data by using agenda
//////////////////////
const agenda = new Agenda({
  db: { address: MONGO_URL, collection: 'fakeUsers' },
});

agenda.define('datafetch', async (job) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = await response.data;

  data.forEach(async (item) => {
    const newDocument = new fakeUsers({
      name: item.name,
      username: item.username,
      email: item.email,
      address: item.address.street,
    });

    await newDocument
      .save()
      .then(() => {
        console.log('data is save in database');
      })
      .catch(() => {
        console.log('error');
      });
  });
});
// agenda.every('10 minutes', 'agenda-data');
(async function () {
  await agenda.start();
  console.log();
  await agenda.every('*/300 * * * *', 'datafetch');
}); // there we need to call a function() for start agenda

//for get all data from database
router.get('/showdata', async (req, res) => {
  try {
    const data = await fakeUsers.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error); // Failure
  }
});

//post for form
router.post('/add-data', async (req, res) => {
  try {
    const data = new fakeUsers({
      name: req.body.name,
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
    });
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Bulk general use
router.post('/bulkUniqueEmail', async (req, res) => {
  try {
    await fakeUsers.bulkWrite([
      {
        updateOne: {
          upsert: true,
          filter: { email: '' },
          update: {
            $set: {
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              address: req.body.address,
            },
          },
        },
      },
    ]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});
module.exports = router;
