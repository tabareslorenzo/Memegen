const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Meme = new Schema({
      meme_url: {
            type: String
      },
      meme_id: {
            type: Number
      }

});

module.exports = mongoose.model('Meme', Meme);
