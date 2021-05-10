const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withSass], [withImages]], {
  env: {
    MY_TRAINER_BACKEND: process.env.MY_TRAINER_BACKEND,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  },
  webpack: config => {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
});
