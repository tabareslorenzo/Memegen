const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const memeRoutes = express.Router();
const PORT = 4000;
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


let Meme = require('./memes.model');
let User = require('./users.model');


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(passport.initialize())

//app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/memes', {useNewUrlParser: true});
const connection = mongoose.connection;


connection.once('open', function(){
      console.log("MongoDB database connection established successfully");
});

// connection.collection.createIndex(
//     {name: 1},
//     {unique:true, sparse:true}
// )

// app.get('/', function (req, res) {
//   console.log("what");
// });


// memeRoutes.route('/').get(function(req, res){
//       console.log("what");
//       Meme.find(function(err, memes){
//             if(err){
//                   console.log(err);
//             }else{
//                   res.json(memes);
//             }
//       });
// });
// {
//             "user_name": "usernamweewerewrser1rerweererwedws",
//             "user_password": "passewwereqwwqerewrerrewerewords1ss"
// }

// memeRoutes.route('/:id').get(function(req,res){
//       let id = req.params.id;
//       Meme.findById(id, function(err, meme){
//             res.json(meme);
//       });
// });
// memeRoutes.route('/login').get(function(req,res){
//       const username = req.body.user_name;
//       const password = req.body.user_password;
// passport.use(new LocalStrategy(
//       function(username, password, done){
//             User.findOne({user_name: username}, function(err, user){
//                   if(err){
//                         console.log(err);
//                         res.status(400).send('adding new meme failed');
//                         return done(err);
//                   }
//                   if(!user)
//                   {
//                         res.status(200).json({'meme': 'Incorrect username'});
//                         return done(null, false, {message: 'Incorrect username'});
//                   }
//                   if(user.user_password !== password)
//                   {
//                         res.status(200).json({'meme': 'Incorrect password'});
//                         return done(null, false, {message: 'Incorrect password'});
//                   }
//                   res.status(200).json({'meme': 'login successfully'});
//                   return done(null, user);
//             })
//       }
// ));
// })
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.use(new LocalStrategy(            {usernameField: 'user_name',
//             passwordField: 'user_password',
//       session: false},
//       function(username, password, done){
//             console.log(password);
//             console.log(username);
//             User.findOne({user_name: username}, function(err, user){
//                   // console.log("password");
//                   if(err){
//                         //console.log(err);
//                         // res.status(400).send('adding new meme failed');
//                         return done(err);
//                   }
//                   if(!user)
//                   {
//                         // res.status(200).json({'meme': 'Incorrect username'});
//                         return done(null, false, {message: 'Incorrect username'});
//                   }
//                   if(user.user_password !== password)
//                   {
//                         // res.status(200).json({'meme': 'Incorrect password'});
//                         return done(null, false, {message: 'Incorrect password'});
//                   }
//                   // res.status(200).json({'meme': 'login successfully'});
//                   return done(null, user);
//             })
//       }
// ));
memeRoutes.route('/').get(function(req, res, next) {
      const password = req.body.user_password;
      console.log("password");

                  //console.log(password);
  passport.authenticate('local', function(err, user, info) {
        // console.log(info);

    if (err) {        console.log(err);

                            // res.status(200).json({'meme': 'login successfully'});

          return next(err); }
    if (!user) {
                            // res.status(200).json({'meme': 'login successfully'});

          return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) {
                              // res.status(200).json({'meme': 'login successfully'});
return next(err); }
console.log(user);
                        return res.send(user.memes + user);
                        //return res.status(200).json({'meme': 'login successfully'});

      // return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
// memeRoutes.route('/login').get(
//
//
//
//
//       function(req, res){
//             //res.json({username: req.body.user_name})
//             const username = req.body.user_name;
//             const password = req.body.user_password;
//             console.log(password);
//             passport.authenticate('local', {session: false})(req,res);
//
//       });

memeRoutes.route('/:id').get(function(req,res){
      let id = req.params.id;
      User.findById(id, function(err, user){
            // user.memes.map(meme => res.json(meme.meme_url));
            // user.memes = user.memes.filter(meme => meme.meme_url != undefined)
            user.save()
                  .then(user =>{

                        console.log(user.memes);
                        res.status(200).json({'meme': 'meme added successfully'});
                  })
                  .catch(err => {
                        console.log(err);
                              res.status(400).send('adding new meme failed');
                  });

            // user.memes.map(meme => Meme.findById(id, function(err, mem){
            //             res.json(mem);
            //       }));
            //res.json(user.memes);
      });
});

memeRoutes.route('/addmeme/:id').post(function(req,res){
      let id = req.params.id;
      User.findById(id, function(err, user){
            if(!user){
                  console.log(err);
                  res.status(400).send('adding new meme failed');
            }
            else{
                  let meme = new Meme(req.body);
                  meme.save()
                  .then(meme =>{
                        user.memes.push(meme);
                              user.save()
                                    .then(user =>{
                                          // console.log(meme);
                                          // console.log(user.memes);
                                          console.log(meme);
                                          console.log(typeof user.memes);
                                          console.log(user.memes);
                                          // console.log(user.memes[0].meme_url);
                                          // user.memes.push(meme);
                                          res.status(200).json({'meme': 'meme added successfully'});
                                    })
                                    .catch(err => {
                                          console.log(err);
                                                res.status(400).send('adding new meme failed');
                                    });
                        console.log(req.body);
                        //res.status(200).json({'meme': 'meme added successfully'});
                  })
                  .catch(err => {
                              //res.status(400).send('adding new meme failed');
                  });

            }


      });
});

// memeRoutes.route('/').get(function(req, res){
//       console.log("what");
//       User.find(function(err, users){
//             if(err){
//                   console.log(err);
//             }else{
//                   res.json(users);
//             }
//       });
// });

memeRoutes.route('/:user').get(function(req,res){
      let username = req.body.user_name;
      let password = req.body.user_password;
      const user = {
            user_name: username,
            user_password: password,
      };
      Meme.find(query).exec(id, function(err, meme){
            res.json(meme);
            console.log(res.json);
      });
});

memeRoutes.route('/adduser').post(function(req, res){
      //console.log(req);
      let user = new User(req.body);
            user.save()
                  .then(user =>{
                        console.log(res.body);
                         console.log(req.body);
                        res.status(200).json({'user': 'user added successfully'});
                  })
                  .catch(err => {
                        console.log(err);
                              res.status(400).send('adding new user failed');
                              console.log(res.body);
                  });
});

memeRoutes.route('/add').post(function(req, res){

      let meme = new Meme(req.body);
            meme.save()
                  .then(meme =>{
                        console.log(req.body);
                        res.status(200).json({'meme': 'meme added successfully'});
                  })
                  .catch(err => {
                              res.status(400).send('adding new meme failed');
                  });
});

app.use('/login', memeRoutes);
//app.use('/user', userRoutes);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.listen(PORT, function(){
            console.log("Server is running on Port:" + PORT);
});
