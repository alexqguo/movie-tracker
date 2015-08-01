var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yomovie'
    },
    port: 3000,
    db: 'postgres://localhost/yomovie-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yomovie'
    },
    port: 3000,
    db: 'postgres://localhost/yomovie-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yomovie'
    },
    port: 3000,
    db: 'postgres://localhost/yomovie-production'
  }
};

module.exports = config[env];