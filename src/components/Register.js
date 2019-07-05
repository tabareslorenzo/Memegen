import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import axios from 'axios';
import {Link} from 'react-router-dom';




class Register extends Component {

      submit = (txt) => {
            const newUser = {
            "user_name": txt.username,
            "user_password": txt.password
            }
            console.log(newUser);
                         axios.post('http://localhost:4000/users/adduser', newUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
            }).then(res => {localStorage.setItem('token', res.data.token); console.log(res.data);this.props.loggin();})
            .catch(function(error){
                                    console.log(error.response);
                              });
      }
      render () {
            return (
                  <div>
                  <h1>Register</h1>
                  <Form submit={this.submit}></Form>
                  </div>
            );

      }
}

export default Register;
