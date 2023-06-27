const express = require('express');
const db = require('../db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
  const meetingsDB = db.getAllFromDatabase('meetings');
  if (meetingsDB) {
    res.send(meetingsDB);
  } else {
    res.status(404).send('Database not found.');
  }
  
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    const addedMeeting = db.addToDatabase('meetings', newMeeting);
    if (addedMeeting) {
        res.status(201).send(addedMeeting);
    } else {
        res.status(400).send('Failed to add meeting data.')
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = db.deleteAllFromDatabase('meetings');
    res.status(204).send();
});


module.exports = meetingsRouter;