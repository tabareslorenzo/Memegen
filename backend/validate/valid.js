const Validator = require("validator")

module.exports = function isvalid(data){
      const{username, password} = data;
      var errors = false;

      if(!username || !password)
      {
                  errors = true;
      }

      const output = {};
      output.errors = errors;
      output.message = "invalid input";

      return output;
}
