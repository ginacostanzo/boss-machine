const express = require('express');
const db = require('../db');

function createModelRouter(modelType) {
    const router = express.Router();
    router.get('/', (req, res, next) => {
        const modelDB = db.getAllFromDatabase(modelType);
        if (modelDB) {
          res.send(modelDB);
        } else {
          res.status(404).send('Database not found.');
        }
        
      });
      
      router.post('/', (req, res, next) => {
          const newInstance = req.body;
          const addedInstance = db.addToDatabase(modelType, newInstance);
          if (addedInstance) {
              res.status(201).send(addedInstance);
          } else {
              res.status(400).send(`Failed to add ${modelType} data.`)
          }
      });
      
      if (modelType !== 'meetings') {
        router.get('/:id', (req, res, next) => {
            const selectedInstance = db.getFromDatabaseById(modelType, req.params.id);
            if (selectedInstance) {
                res.send(selectedInstance);
            } else {
                res.status(404).send(`${modelType} not found.`);
            }
        });
      }
      
      if (modelType !== 'meetings') {
        router.put('/:id', (req, res, next) => {
            const selectedInstance = db.getFromDatabaseById(modelType, req.params.id);
            if (selectedInstance) {
              Object.assign(selectedInstance, req.body)
                const updatedInstance = db.updateInstanceInDatabase(modelType, selectedInstance);
                if (updatedInstance) {
                    res.send(updatedInstance);
                } else {
                    res.status(500).send('Update failed.');
                }
            } else {
                res.status(404).send(`${modelType} not found.`);
            }
        });
      }
      router.delete('/:id', (req, res, next) => {
          const selectedInstance = db.getFromDatabaseById(modelType, req.params.id);
          if (selectedInstance) {
              const deletedInstance = db.deleteFromDatabasebyId(modelType, req.params.id);
              if (deletedInstance) {
                  res.send('Deletion successful.');
              } else {
                  res.status(500).send('Deletion failed.');
              }
          } else {
              res.status(404).send(`${modelType} not found.`);
          }
      });
      return router;
}

// Create routers for minions and ideas
const minionsRouter = createModelRouter('minions');
const ideasRouter = createModelRouter('ideas');
const meetingsRouter = createModelRouter('meetings')



module.exports = {
    ideasRouter,
    minionsRouter,
    meetingsRouter};
