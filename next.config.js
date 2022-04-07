
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DEVELOPMENT_DB_DSN: process.env.DEVELOPMENT_DB_DSN,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_PUBLIC_KEY: process.env.MAILGUN_PUBLIC_KEY,

    MAPBOX_USERNAME: process.env.MAPBOX_USERNAME,
    MAPBOX_STYLE_ID: process.env.MAPBOX_STYLE_ID,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,

    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

    CLOUDINARY_URL: process.env.CLOUDINARY_URL
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack: (config, { isServer }) => {

    if (!isServer) {
      config.resolve.fallback = {
        "crypto": false,
        "https": false,
        "http": false,
        "stream": false,
        "path": false,
        "os": false,
        "zlib": false,
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        ...{
          child_process: 'empty',
          fs: false,
          crypto: 'empty',
          net: false,
          tls: false,
          dns: false,
          "vm": require.resolve("vm-browserify"),
        }
      }
      config.optimization.minimize = true;
      config.optimization.minimizer.push(new TerserPlugin());
    }
    config.module.rules.push(
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },

    )

    return config;
  }
}
