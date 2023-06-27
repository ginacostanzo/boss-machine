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

minionsRouter.param('minionId', (req, res, next, id) => {
    const foundMinion = db.getFromDatabaseById('minions', id);
    if (!foundMinion) {
        res.status(404).send({error: 'minion not found'})
    } else {
        req.foundMinion = foundMinion;
        next();
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.foundMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(500).send('Minion update failed.');
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = db.deleteFromDatabasebyId('minions', req.foundMinion.id);
    if (deletedMinion) {
        res.send('Minion deleted successfully.');
    } else {
        res.status(500).send('Minion deletion failed.');
    }
});

module.exports = minionsRouter;