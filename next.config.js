const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const optimizedImages = require('next-optimized-images');
const withPWA = require('next-pwa');

module.exports = withPWA(
  withImages(
    optimizedImages(
      withCSS(
        withSass({
          pwa: {
            dest: 'public'
          },

          env: {
            MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
            useFileSystemPublicRoutes: false
          },

          webpack(config, options) {
            config.module.rules.push({
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 100000,
                  target: 'serverless'
                }
              }
            });

            return config;
          }
        })
      )
    )
  )
);
