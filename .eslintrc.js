module.exports = {
  extends: 'airbnb',
  env: {
    browser: true
  },
  rules: {
    'no-underscore-dangle': 0,
    'comma-dangle': 0,
    'no-shadow': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack-config/webpack.config.base.js'
      }
    }
  }
};
