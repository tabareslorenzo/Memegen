import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';


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
            console.log(this.state.submition);
            this.setState({submition:
                  {
                        username: '',
                        password: ''
                  }});
      }
      onChange = (e) => {
            console.log(this.state.submition);
            console.log(e.target.value);
            if(e.target.name == 'username'){
                  console.log(this.state.submition.password);
                  this.setState({submition:
                  {
                        username: e.target.value,
                        password: this.state.submition.password

                  }});
            }
            else{
                  console.log(this.state.submition.username);

                  this.setState({submition:
                  {
                        username: this.state.submition.username,
                        password: e.target.value,

                  }});
            }


            console.log(this.state.submition);

      }
      render(){
            return(
            <div>
            <form>
                  <label>Username</label>
                  <input
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  />

                  <label>Password</label>
                  <input
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  />
            </form>
            <button className="btn-container" style={btnStyle} onClick={this.onSubmit}>Submit</button>
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

export default Form;
