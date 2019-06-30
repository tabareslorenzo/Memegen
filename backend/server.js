const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const memeRoutes = express.Router();
const PORT = 4000;


let Meme = require('./memes.model');


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/memes', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
      console.log("MongoDB database connection established successfully");
});

// app.get('/', function (req, res) {
//   console.log("what");
// });

memeRoutes.route('/').get(function(req, res){
      console.log("what");
      Meme.find(function(err, memes){
            if(err){
                  console.log(err);
            }else{
                  res.json(memes);
            }
      });
});

memeRoutes.route('/:id').get(function(req,res){
      let id = req.params.id;
      Meme.findById(id, function(err, meme){
            res.json(meme);
      });
});

memeRoutes.route('/add').post(function(req, res){
      let meme = new Meme(req.body);
            meme.save()
                  .then(meme =>{
                        res.status(200).json({'meme': 'meme added successfully'});
                  })
                  .catch(err => {
                              res.status(400).send('adding new meme failed');
                  });
});

app.use('/memes', memeRoutes);

app.listen(PORT, function(){
            console.log("Server is running on Port:" + PORT);
});
