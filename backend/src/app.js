const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const { errorMiddleware } = require('./middlewares/error.middleware');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorMiddleware);

module.exports = app;
