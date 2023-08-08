const path = require("path");

module.exports = function override(config) {
  // Add this alias resolution configuration to the Webpack resolver
  config.resolve.alias = {
    ...config.resolve.alias,
    "@data": path.resolve(__dirname, "src/data"),
    "@lib": path.resolve(__dirname, "src/lib"),
    "@customTypes": path.resolve(__dirname, "src/types"),
    "@scss": path.resolve(__dirname, "src/assets/css"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@components": path.resolve(__dirname, "src/components"),
  };

  // config.module.rules.push({
  //   test: /\.(mp4|webm)$/,
  //   loader: "file-loader",
  //   options: {
  //     name: "static/media/[name].[hash].[ext]"
  //   },
  // });
  return config;
};
