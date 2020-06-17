const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps(
  withCSS(
    withSass({
      target: 'serverless',
      env: {
        MAPBOX_ACCESS_TOKEN:
         ''
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
