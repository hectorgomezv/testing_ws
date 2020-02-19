'use strict';

require('dotenv').config();

const {
  mongo,
  webServer,
} = require('./app/infrastructure');

(async function initApp() {
  try {
    await mongo.connect();
    await webServer.listen(4110);
    console.log('Application listening to localhost:4110');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}());

process.on('unhandledRejection', (err) => {
  const errMsg = `Unhandled rejection, message: ${err.message}`;
  console.error(errMsg);
  console.error(err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});
