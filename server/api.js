const express = require('express');
const apiRouter = express.Router();
const meetingsRouter = require('./routes/meetingsRouter');
const minionsRouter = require('./routes/minionsRouter');
const ideasRouter = require('./routes/ideasRouter');

apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
