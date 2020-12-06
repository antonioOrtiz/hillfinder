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
          // generateSw: false, // this allows all your workboxOpts to be passed in injectManifest
          generateInDevMode: true,
          workboxOpts: {
            swDest: './service-worker.js', // this is the important part,
            exclude: [/.+error\.js$/, /\.map$/, /\.(?:png|jpg|jpeg|svg)$/],
            runtimeCaching: [
              {
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'hillfinder-images'
                }
              },
              {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'hillfinder-https-calls',
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
