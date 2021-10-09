
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  target: "serverless",
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

    MAILGUN_SMTP_CREDENTIALS: process.env.MAILGUN_SMTP_CREDENTIALS,

    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

    CLOUDINARY_URL: process.env.CLOUDINARY_URL
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack5: true,

  webpack: (config, { isServer }) => {
    const externals = {
      ...config.externals,
      bcrypt: 'bcrypt',
      jimp: 'jimp',
      'probe-image-size': 'probe-image-size'
    }
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...{
          child_process: 'empty',
          critters: false,
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

    return {
      ...config,

      externals
    }
  }
}
