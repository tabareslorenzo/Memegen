import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './image.css';


/**
 * ComponentName
 */
export class Navigationbar extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
        if(this.props.isloggedin)
        {
             return (
                  <Navbar variant="dark" bg="dark justify-content-between" >
                        <h2 className="Welcome">Welcome to my Meme Generator!</h2>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="justify-content-end">
                           <Nav.Link href="/"><h2>Home</h2></Nav.Link>
                           <Nav.Link href="saved" ><h2>Saved</h2></Nav.Link>
                     </Nav>

               </Navbar>
             );
       }
    return (
      <Navbar variant="dark" bg="dark justify-content-between" >
            <h2 className="Welcome">Welcome to my Meme Generator!</h2>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="justify-content-end">
                  <Nav.Link href="/"><h2>Home</h2></Nav.Link>
                  <Nav.Link href="login" align="right"><h2>Login/Register</h2></Nav.Link>

            </Nav>

      </Navbar>
    );
  }
}


Navbar.propTypes = {
  isloggedin: PropTypes.bool.isRequired
}
const textStyle = {
      color:"black",
      paddingRight: '30px',
      fontFamily: "Andale Mono"
}
const linkStyle={
      color:"black",
      size:"100px",
      border: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',

      fontFamily: "Andale Mono",
      '&:hover': {
             backgroundColor: 'blue',
        }

}
export default Navigationbar;
