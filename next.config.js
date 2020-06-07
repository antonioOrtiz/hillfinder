const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withCSS(
    withSass({
      target: 'serverless',
      env: {
        MAPBOX_ACCESS_TOKEN:
          'pk.eyJ1IjoiYW50b25pb3BvcnRpeiIsImEiOiJja2E3NWx4Zm8wN3k4MnBvOWc0YnNoMm96In0.Ckc-lH-tUqB7aQckJhM2IQ'
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
);
