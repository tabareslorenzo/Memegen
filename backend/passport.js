const passport = require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

let User = require('./users.model');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport =>{
      passport.use(new JwtStrategy(opts ,function(jwt_payload, done)
                  {
                        User.findOne({user_name: jwt_payload.username}, function(err, user){

                              if(err){
                                    return done(err);
                              }
                              else if(!user)
                              {
                                    return done(null, false, {message: 'Incorrect username'});
                              }

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
