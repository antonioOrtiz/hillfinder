const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const optimizedImages = require('next-optimized-images');
const withOffline = require('next-offline');

module.exports = withOffline(
  withImages(
    optimizedImages(
      withCSS(
        withSass({
          // useFileSystemPublicRoutes: false,
          generateInDevMode: true,
          workboxOpts: {
            swDest: './service-worker.js', // this is the important part,
            exclude: [/.+error\.js$/, /\.map$/],
            runtimeCaching: [
              {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'https-calls',
                  networkTimeoutSeconds: 15,
                  expiration: {
                    maxEntries: 150,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ]
          },
          dontAutoRegisterSw: false,
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
