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
      console.log("password");
      const {notValid, errMsg} = isvalid(req.body);
      if(notValid){
            return res.status(400).send(errMsg);
      }
      const password = req.body.user_password;
      console.log("password");

                  //console.log(password);
  //passport.authenticate('local', function(err, user, info) {
        // console.log(info);
        console.log(req.body.user_name);
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
                  console.log("password1");
                  console.log(user.user_password);
                  console.log(password);
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
                        console.log("password2");
                        jwt.sign(payload, secretOrKey, function(err, token){
                              console.log("password3");
                              if(err){
                                    return res.status(400).send(err);
                              }
                              else{
                                    res.json({token: 'Bearer' + token});
                              }
                        }
                        )
                  }
            //})

        });

      });


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

userRoutes.route('/meme').get(passport.authenticate('jwt', { session: false }),
    function(req, res) {
          console.log("res");
          console.log(req.user);
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
            // user.memes.map(meme => res.json(meme.meme_url));
            // user.memes = user.memes.filter(meme => meme.meme_url != undefined)
            // user.save()
                  // .then(user =>{
                  //
                  //       console.log(user.memes);
                  //       res.status(200).json({'meme': 'meme added successfully'});
                  // })
                  // .catch(err => {
                  //       console.log(err);
                  //             res.status(400).send('adding new meme failed');
                  // });
                  console.log(err);
                  if(err){
                        return  res.status(400).send(err);
                  }
                  if(!user){
                        return  res.status(400).send(user);
                  }
                  console.log(err);
                  return res.status(200).send(user.memes);

            // user.memes.map(meme => Meme.findById(id, function(err, mem){
            //             res.json(mem);
            //       }));
            //res.json(user.memes);
      });
});

userRoutes.route('/addmeme').post(passport.authenticate('jwt', { session: false }),
    function(req, res) {
          console.log("res");
          //console.log(req.body);
          if(!req.user)
          {

                return res.send("ops");
          }
          let meme = new Meme(req.body);
          user = req.user;
          console.log("res");
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
                //console.log(req.body);
                // res.status(200).json({'meme': 'meme added successfully'});
          })
          .catch(err => {

                console.log(err);
                      res.status(400).send('adding new meme failed');
          });
        //res.send(req.user);
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
      //console.log(req);
      // const user = req.body.user_password;
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
                                     console.log(user.user_password);
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
