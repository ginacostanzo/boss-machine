const express = require('express');
const app = express();
const apiRouter = express.Router();

app.use('/api', apiRouter);




module.exports = apiRouter;
