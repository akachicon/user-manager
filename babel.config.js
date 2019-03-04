module.exports = (api) => {
  const __DEV__ = api.env('development');

  api.cache.forever();

  return {
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: false,
          useESModules: true
        }
      ],
      'react-hot-loader/babel'
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'entry',
          debug: __DEV__
        }
      ],
      [
        '@babel/preset-react',
        {
          development: __DEV__
        }
      ]
    ]
  };
};
