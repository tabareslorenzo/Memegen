import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Form.css';




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
            }).then(res => {localStorage.setItem('token', res.data.token); console.log(res.data.token);
                  axios.post('http://localhost:4000/users/login', newUser, {
             headers: {
                 'Content-Type': 'application/json'
             }
    }).then(res => {localStorage.setItem('token', res.data.token); console.log(res.data.token);this.props.loggin();})
    .catch(function(error){
                             console.log(error.response);
                       });
                  })
            .catch(error =>{
                                    console.log(error.response);
                              });
      }
      render () {
            return (
                  <div className="container">
                  <h1>Register</h1>
                  <br/>
                  <Form submit={this.submit}></Form>
                  </div>
            );

      }
}

export default Register;
