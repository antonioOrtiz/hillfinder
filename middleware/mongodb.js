import mongoose from 'mongoose';

// Get your connection string from .env.local
let MONGODB_CONN_STR;


if (process.env.NODE_ENV === 'production') MONGODB_CONN_STR = process.env.MONGODB_URI;
else MONGODB_CONN_STR = process.env.DEVELOPMENT_DB_DSN


const databaseMiddleware = async (req, res, next) => {

  try {
    if (!global.mongoose) {

      global.mongoose = await mongoose.connect(MONGODB_CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }
  catch (ex) {
    console.error('fucking error', ex);
  }

  // You could extend the NextRequest interface
  // with the mongoose instance as well if you wish.
  // req.mongoose = global.mongoose;



};

export default databaseMiddleware;
