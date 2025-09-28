function yamlWebpackPlugin() {
  return {
    name: "yaml-webpack-plugin",
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.ya?ml$/,
              use: "yaml-loader",
            },
          ],
        },
      };
    },
  };
}

module.exports = yamlWebpackPlugin;
