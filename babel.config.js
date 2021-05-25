module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin', ["import", { "libraryName": "antd-mobile-rn" }],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '@api': './ApiManager',
          '@util': './util',
        },
      },
    ],
    ]
  };
};
