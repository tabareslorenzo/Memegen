const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const memeRoutes = express.Router();
const PORT = 4000;
const passport = require('passport');
const users = require("./user");

// const LocalStrategy = require('passport-local').Strategy;

require("./passport")(passport);


let User = require('./users.model');


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(passport.initialize());

//app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/memes', {useNewUrlParser: true});
const connection = mongoose.connection;


connection.once('open', function(){
      console.log("MongoDB database connection established successfully");
});

app.use("/users", users);


// app.use('/login', memeRoutes);
//app.use('/user', userRoutes);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.listen(PORT, function(){
            console.log("Server is running on Port:" + PORT);
});
