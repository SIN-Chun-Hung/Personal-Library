const mongoose = require('mongoose');
const database = mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports = database; 