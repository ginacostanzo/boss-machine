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

ideasRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    const addedMeeting = db.addToDatabase('meetings', newMeeting);
    if (addedMeeting) {
        res.status(201).send(addedMeeting);
    } else {
        res.status(400).send('Failed to add meeting data.')
    }
});

ideasRouter.delete('/:meetingId', (req, res, next) => {
    const deletedMeeting = db.deleteFromDatabasebyId('meetings', req.params.meetingId);
    if (deletedMeeting) {
        res.send();
    } else {
        res.status(500).send('Meeting deletion failed.');
    }
})


module.exports = meetingsRouter;