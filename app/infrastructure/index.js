'use strict';

const webServer = require('./web-server');
const { mongo } = require('./databases');

module.exports = {
  webServer,
  mongo,
};
