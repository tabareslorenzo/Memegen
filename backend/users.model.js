const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Memes = require('./memes.model').schema;

let User = new Schema({
      user_name: {
            type: String,
            // unique: true,
            required: true,
      },
      user_password: {
            type: String,
            // unique: true,
            required: true,
      },
      memes: [Memes],


});
User.index({
  user_name: 1,
  user_password: 1,
}, {
  unique: true,
});
module.exports = mongoose.model('User', User);
