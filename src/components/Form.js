import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './image.css';


class Form extends React.Component {
      state = {
            submition: {
                  username: '',
                  password: ''
            }

      }

      onSubmit = (e) => {
            e.preventDefault();
            this.props.submit(this.state.submition);
            this.setState({submition:
                  {
                        username: '',
                        password: ''
                  }});
      }
      onChange = (e) => {
            if(e.target.name == 'username'){
                  this.setState({submition:
                  {
                        username: e.target.value,
                        password: this.state.submition.password

                  }});
            }
            else{

                  this.setState({submition:
                  {
                        username: this.state.submition.username,
                        password: e.target.value,

                  }});
            }



      }
      render(){
            return(
            <div>
            <form style={inputStyle}>
                  <label>Username
                        <input
                        type="text"
                        name="username"
                        onChange={this.onChange}
                        />
                  </label>


                  <label>Password
                        <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        />
                  </label>

            </form>
            <br/>
            <Button onClick={this.onSubmit} variant="outline-primary" size="lg" >Submit</Button>
            </div>
      );
      }

}
const btnStyle = {
      left: '100%',
      backgroundColor: '#0033cc',
      color: '#fff',
      border: '10px',
      padding: '5px 8px',
      cursor: 'pointer',
      float: 'right'
}
const formStyle = {
      left: '100%',
      backgroundColor: '#0033cc',
      color: '#fff',
      border: '10px',
      padding: '5px 8px',
      cursor: 'pointer',
      float: 'right'
}
const inputStyle = {
      padding:'10px'
}


export default Form;
//<Button onClick={this.props.selectImg.bind(this, url)} variant="outline-primary" size="lg" block>{pics.name} </Button>
