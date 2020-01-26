import React, {Component} from 'react';
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Form from './Form';
import axios from 'axios';
import './Form.css';
import Alert from 'react-bootstrap/Alert';



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
            .catch(error => {
                                    console.log(error.response);
                                    failedlogin = true;
                                    this.props.logout();
                              });
      }
      render () {
            if(this.props.loggedin){
                  console.log(this.props.loggedin);
                  console.log("whattttt");
                  return(<Redirect to="/" />);
            }
            else if(failedlogin)
            {
                  return (
                        <div className="container">
                        <Alert variant="danger">
                              Invalid username or password! 
                        </Alert>
                        <h1>Sign In</h1>
                        <br/>
                        <Form submit={this.submit}></Form>
                        </div>
                  );
            }
            return (
                  <div className="container">
                  <h1>Sign In</h1>
                  <br/>
                  <Form submit={this.submit}></Form>
                  </div>
            );

      }

}
var failedlogin = false;
export default login;
