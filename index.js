require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const server = http.createServer(app);

process.on('uncaughtException', () => process.exit(1));

const startCallback = () => {
  console.log('admin application started', { pid: process.pid, port: process.env.PORT });
};

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use('*', (_req, res) => res.status(404).send({ message: 'Resource not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => res.status(500).json({ message: err.message }));

server.listen(process.env.PORT, startCallback);
