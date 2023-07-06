const path = require("path");

module.exports = function override(config) {
  config.module.rules.push({
    test: /\.(mp4|webm)$/,
    loader: "file-loader",
    options: {
      name: "static/media/[name].[hash:8].[ext]",
    },
  });
  return config;
};
