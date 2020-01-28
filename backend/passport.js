const passport = require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

let User = require('./users.model');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.passReqToCallback = true;


module.exports = passport =>{
      passport.use(new JwtStrategy(opts ,function(jwt_payload, done)
                  {
                        User.findOne({user_name: jwt_payload.username}, function(err, user){
                              // console.log( jwt_payload);
                              // console.log( jwt_payload.username);
                              if(err){
                                    //console.log(err);
                                    // res.status(400).send('adding new meme failed');
                                    return done(err);
                              }
                              else if(!user)
                              {
                                    // res.status(200).json({'meme': 'Incorrect username'});
                                    return done(null, false, {message: 'Incorrect username'});
                              }
                              // res.status(200).json({'meme': 'login successfully'});
                              // console.log( jwt_payload.username);
                              // console.log(user);
                              // req.user = user;
                              return done(null, user);
                        })
                  }


      ));
};


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
