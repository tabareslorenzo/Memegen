const express = require('express');
const app = express();
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');



let User = require('./users.model');
let Meme = require('./memes.model');

require("./passport")(passport);
let isvalid = require('./validate/valid');
const secretOrKey = 'secret';


userRoutes.route('/login').post(function(req, res, next) {
      const {notValid, errMsg} = isvalid(req.body);
      if(notValid){
            return res.status(400).send(errMsg);
      }
      const password = req.body.user_password;


        User.findOne({user_name: req.body.user_name}, function(err, user)
        {
             console.log("password");
             if(err)
             {
                  return res.status(400).send(err);
             }
             else if(!user)
             {
                  return res.status(400).send("wrong username");
             }

             bcrypt.compare(password, user.user_password, function(err, same){

                  if(err){
                        return res.status(400).send(err);
                  }
                  else if(!same){
                        // console.log(res);
                        return res.status(400).send("wrong password");
                  }
                  else{
                        const payload = {};
                        payload.id = user.id;
                        payload.username = user.user_name;
                        jwt.sign(payload, secretOrKey, function(err, token){
                              if(err){
                                    return res.status(400).send(err);
                              }
                              else{
                                    res.json({token: 'Bearer' + token});
                              }
                        }
                        )
                  }

        });

      });


});


userRoutes.route('/auth').get(passport.authenticate('jwt', { session: false }),
    function(req, res) {
          console.log("res");
          if(!req.user)
          {

                return res.send("ops");
          }
        res.send("ok");
    }
);
userRoutes.route('/memes').get(passport.authenticate('jwt', { session: false }),
    function(req, res) {

          if(!req.user)
          {

                return res.send("ops");
          }
        res.send(req.user);
    }
);

userRoutes.route('/:id').get(function(req,res){
      let id = req.params.id;
      console.log(req.headers.authorization);
      User.findById(id, function(err, user){

                  console.log(err);
                  if(err){
                        return  res.status(400).send(err);
                  }
                  if(!user){
                        return  res.status(400).send(user);
                  }
                  console.log(err);
                  return res.status(200).send(user.memes);


      });
});

userRoutes.route('/addmeme').post(passport.authenticate('jwt', { session: false }),
    function(req, res) {
          if(!req.user)
          {

                return res.send("ops");
          }
          let meme = new Meme(req.body);
          user = req.user;
          meme.save()
          .then(meme =>{
                if(user.memes.length>7)
                {
                      user.memes.splice(0,1);
                }
                user.memes.push(meme);
                      user.save()
                            .then(user =>{

                                  res.status(200).json({'meme': 'meme added successfully'});
                            })
                            .catch(err => {
                                  console.log(err);
                                        res.status(400).send('adding new meme failed');
                            });

          })
          .catch(err => {

                console.log(err);
                      res.status(400).send('adding new meme failed');
          });
    }
);
userRoutes.route('/addmeme/:id').post(function(req,res){
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

                                          res.status(200).json({'meme': 'meme added successfully'});
                                    })
                                    .catch(err => {
                                          console.log(err);
                                                res.status(400).send('adding new meme failed');
                                    });
                        console.log(req.body);
                  })
                  .catch(err => {
                  });

            }


      });
});

userRoutes.route('/').get(function(req, res){
      User.find(function(err, users){
            if(err){
                  console.log(err);
            }else{
                  res.json(users);
            }
      });
});

userRoutes.route('/:user').get(function(req,res){
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

userRoutes.route('/adduser').post(function(req, res){

      const {notValid, errMsg} = isvalid(req.body);
      if(notValid){
            return res.status(400).send(errMsg);
      }
      User.findOne({user_name: req.body.user_name}, function(err, user)
      {
           if(err)
           {
                return res.status(400).send(err);
           }
           else if(user)
           {
                 console.log("hello");
                return res.status(400).send("username already exists");
           }
           console.log("hello");
            const tempuser = req.body;
            bcrypt.genSalt(10, function(err, salt){
                  bcrypt.hash(tempuser.user_password, salt, function(err, hash){
                        if(err)
                        {
                              return res.status(400).send(err);
                        }
                        tempuser.user_password = hash;
                        let user = new User(tempuser);
                        user.save()
                              .then(user =>{
                                    // console.log(res.body);

                                    res.status(200).json({'user': 'user added successfully'});
                              })
                              .catch(err => {
                                    console.log(err);
                                          res.status(400).send('adding new user failed');
                                          console.log(res.body);
                              });

                  });
            });

    });



});

userRoutes.route('/add').post(function(req, res){

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

module.exports = userRoutes;
