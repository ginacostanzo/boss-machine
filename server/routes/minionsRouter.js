const express = require('express');
const db = require('../db');
const minionsRouter = express.Router();

minionsRouter.get('/', (req, res, next) => {
  const minionsDB = db.getAllFromDatabase('minions');
  if (minionsDB) {
    res.send(minionsDB);
  } else {
    res.status(404).send('Database not found.');
  }
  
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    const addedMinion = db.addToDatabase('minions', newMinion);
    if (addedMinion) {
        res.status(201).send(addedMinion);
    } else {
        res.status(400).send('Failed to add minion data.')
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const selectedMinion = db.getFromDatabaseById('minions', req.params.minionId);
    if (selectedMinion) {
        res.send(selectedMinion);
    } else {
        res.status(404).send('Minion not found');
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const selectedMinion = db.getFromDatabaseById('minions', req.params.minionId);
    if (selectedMinion) {
        selectedMinion.name = req.body.name;
        selectedMinion.title = req.body.title;
        selectedMinion.weaknesses = req.body.weaknesses;
        const updatedMinion = db.updateInstanceInDatabase('minions', selectedMinion);
        if (updatedMinion) {
            res.send(updatedMinion);
        } else {
            res.status(500).send('Minion update failed.');
        }
    } else {
        res.status(404).send('Minion not found.');
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const selectedMinion = db.getFromDatabaseById('minions', req.params.minionId);
    if (selectedMinion) {
        const deletedMinion = db.deleteFromDatabasebyId('minions', req.params.minionId);
        if (deletedMinion) {
            res.send('Minion deleted successfully.');
        } else {
            res.status(500).send('Minion deletion failed.');
        }
    } else {
        res.status(404).send('Minion not found.');
    }
})


module.exports = minionsRouter;
