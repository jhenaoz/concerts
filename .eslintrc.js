'use strict';

module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'airbnb-base'
  ],
  'rules': {
    'comma-dangle': [
      'error',
      'never']
  }
};
