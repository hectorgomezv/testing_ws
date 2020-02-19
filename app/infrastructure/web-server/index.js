'use strict';

const fastify = require('fastify');
const { fixEmployee } = require('../../domain/use-cases/employee');

const app = fastify();

(function init() {
  app.patch('/api/employees/:id', {}, fixEmployee);
}());

async function listen(port) {
  app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

module.exports = {
  app,
  listen,
};
