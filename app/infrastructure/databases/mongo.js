'use strict';

const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = process.env;

function connect(mongoUri = MONGO_CONNECTION_STRING) {
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 5000,
  });
}

function disconnect() {
  return mongoose.disconnect();
}

async function startSession() {
  return mongoose.startSession();
}

module.exports = {
  connect,
  disconnect,
  startSession,
};
