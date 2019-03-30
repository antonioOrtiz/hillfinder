const mongoose = require('mongoose');

const connect = function connectHandler() {
  return mongoose.connect('mongodb://localhost:27017/hillfinder');
};
