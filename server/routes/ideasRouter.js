const express = require('express');
const db = require('../db');
const ideasRouter = express.Router();

ideasRouter.get('/', (req, res, next) => {
  const ideasDB = db.getAllFromDatabase('ideas');
  if (ideasDB) {
    res.send(ideasDB);
  } else {
    res.status(404).send('Database not found.');
  }
  
});

ideasRouter.post('/', (req, res, next) => {
    const newIdea = req.body;
    const addedIdea = db.addToDatabase('ideas', newIdea);
    if (addedIdea) {
        res.status(201).send(addedIdea);
    } else {
        res.status(400).send('Failed to add idea data.')
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const selectedIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (selectedIdea) {
        res.send(selectedIdea);
    } else {
        res.status(404).send('Idea not found');
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const selectedIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (selectedIdea) {
        selectedIdea.name = req.body.name;
        selectedIdea.numWeeks = req.body.numWeeks;
        selectedIdea.description = req.body.description;
        selectedIdea.weeklyRevenue = req.body.weeklyRevenue;
        const updatedIdea = db.updateInstanceInDatabase('ideas', selectedIdea);
        if (updatedIdea) {
            res.send(updatedIdea);
        } else {
            res.status(500).send('Idea update failed.');
        }
    } else {
        res.status(404).send('Idea not found.');
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const selectedIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (selectedIdea) {
        const deletedIdea = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
        if (deletedIdea) {
            res.send('Idea deleted successfully.');
        } else {
            res.status(500).send('Idea deletion failed.');
        }
    } else {
        res.status(404).send('Idea not found.');
    }
})


module.exports = ideasRouter;
