const endpoints = require('./endpoints');

module.exports = (app) => {
  app.use('/api', endpoints);
};
