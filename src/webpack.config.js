// webpack.config.js
const Dotenv = require("dotenv-webpack");

module.exports = {
  // ... other configuration options
  plugins: [
    new Dotenv({
      path: "./.env", // Optional: Path to your .env file (defaults to './.env')
    }),
    // ... other plugins
  ],
};
