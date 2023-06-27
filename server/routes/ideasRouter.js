const express = require('express');
const db = require('../db');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

ideasRouter.get('/', (req, res, next) => {
  const ideasDB = db.getAllFromDatabase('ideas');
  if (ideasDB) {
    res.send(ideasDB);
  } else {
    res.status(404).send('Database not found.');
  }
  
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    const addedIdea = db.addToDatabase('ideas', newIdea);
    if (addedIdea) {
        res.status(201).send(addedIdea);
    } else {
        res.status(400).send('Failed to add idea data.')
    }
});

ideasRouter.param('ideaId', (req, res, next, id) => {
    const foundIdea = db.getFromDatabaseById('ideas', id);
    if (!foundIdea) {
        res.status(404).send({error: 'idea not found'})
    } else {
        req.foundIdea = foundIdea;
        next();
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.foundIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(500).send('Idea update failed.');
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = db.deleteFromDatabasebyId('ideas', req.foundIdea.id);
    if (deletedIdea) {
        res.status(204).send();
    } else {
        res.status(404).send('Idea deletion failed.');
    }
})


module.exports = ideasRouter;