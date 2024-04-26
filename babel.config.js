module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 1%, last 2 versions, not ie <= 8, ios >= 6, not dead",
        modules: false,
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
