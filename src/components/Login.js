import React, {Component} from 'react';
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Form from './Form';
import axios from 'axios';



class login extends Component{
      submit = (txt) => {
            const User = {
            "user_name": txt.username,
        	"user_password": txt.password
            }
            console.log(User);
                         axios.post('http://localhost:4000/users/login', User, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
            }).then(res => {localStorage.setItem('token', res.data.token); console.log(res.data.token);this.props.loggin();})
            .catch(function(error){
                                    console.log(error.response);
                              });
      }
      render () {
            if(this.props.loggedin){
                  console.log(this.props.loggedin);
                  console.log("whattttt");
                  return(<Redirect to="/" />);
            }
            return (
                  <div>
                  <h1>sign in</h1>
                  <Form submit={this.submit}></Form>
                  </div>
            );

      }
}

export default login;
